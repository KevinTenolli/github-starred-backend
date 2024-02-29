import QueryStream from 'pg-query-stream'
import { pgPool } from '../pgconfig'
import RepositoryData from '../entity/RepositoryData.entity'
import { Octokit } from '@octokit/rest'
import Commit from '../models/Commit'
import { RepoCommits } from '../entity/RepoCommits.entity'
import RepoCommitsRepository from '../repository/RepoCommitRepository'
import cron from 'node-cron'

export async function setupCronJob() {
    const cronString = process.env.CRON as string
    console.log(process.env)
    return cron.schedule(cronString, async() => {
        await getCommitData()
    })
    
}

/**
 * Represents the daily commit data.
 */
interface DailyCommitData {
    [date: string]: number,
}

/**
 * Retrieves missing commit data for all repositories.
 */
async function getCommitData() {
    const client = await pgPool.connect()
    //get a stream of repositories, their names, their owner name, if there are commits saved, get their last commit date
    const query = new QueryStream(`
        SELECT repo.id AS "repoId", repo."repoName" as "repoName", owner."ownerUsername" as "ownerUsername", max(repo_commits."commitDate") as "lastCommitDate"
        FROM repo
        FULL JOIN owner on repo."ownerId" = owner.id
        FULL JOIN repo_commits on repo.id = repo_commits."repoId"
        GROUP BY repo.id, repo."repoName", owner."ownerUsername"`
    )
    const stream = client.query(query)
    
    //for each repository, get the missing commit data and save it in the database
    for await (const row of stream as AsyncIterable<RepositoryData>) {
        try {
            const dataToInsert = await requestHandler(row)
            if (dataToInsert) {
                await RepoCommitsRepository.saveRepoCommits(dataToInsert)
            }
        } catch (error) {
            console.error(`Error while handling request and saving data for row ${JSON.stringify(row)}:`, error)
        }
    }
}

/**
 * Main function to process commit data.
 * Retrieves the commit counts for each date and transforms it in a model ready to be saved in the database
 * @param repositoryData - data for each repository 
 */
async function requestHandler(repositoryData: RepositoryData) {
    const commitCountsPerDay = await fetchAllCommits(repositoryData)

    const dataToInsert: RepoCommits[] = []
    Object.entries(commitCountsPerDay).forEach(([date, count]) => {
        dataToInsert.push({
            commitDate: date,
            repoId: repositoryData.repoId,
            numberOfCommits: count,
        })
    })
    return dataToInsert
}

/**
 * Fetches all commits for a repository.
 * @param owner - The owner of the repository.
 * @param repo - The name of the repository.
 * @returns A promise that resolves to the daily commit data.
 */
async function fetchAllCommits(repositoryData: RepositoryData): Promise<DailyCommitData> {
    const commitCountsPerDay: DailyCommitData = {}
    let page = 1
  
    do {
        const response = await fetchCommitsPage(repositoryData, page)
        const commits = response.data as unknown as Commit[]
        processCommits(commitCountsPerDay, commits)
  
        const linkHeader = response.headers.link
        if (linkHeader && /rel="next"/.test(linkHeader)) {
            page++
        } else {
            break
        }
    // eslint-disable-next-line no-constant-condition
    } while (true)
  
    return commitCountsPerDay
}

/**
 * Fetches paginated commits for a repository.
 * @param owner - The owner of the repository.
 * @param repo - The name of the repository.
 * @param page - The page number.
 * @returns A promise that resolves to the response containing the commits.
 */
async function fetchCommitsPage(repositoryData: RepositoryData, page: number = 1){
    const octokit = new Octokit()
    if (repositoryData.lastCommitDate) {

        return await octokit.request('GET /repos/{owner}/{repo}/commits', {
            owner: repositoryData.ownerUsername,
            repo: repositoryData.repoName,
            per_page: 100,
            page: page,
            since: repositoryData.lastCommitDate
        })
    } else {
        return await octokit.request('GET /repos/{owner}/{repo}/commits', {
            owner: repositoryData.ownerUsername,
            repo: repositoryData.repoName,
            per_page: 100,
            page: page,
        })
    }

}

/**
 * Processes the fetched commits and updates the commit counts per day.
 * @param commitCountsPerDay - The object containing the commit counts per day.
 * @param commits - The array of commits.
 */
function processCommits(commitCountsPerDay: { [date: string]: number }, commits: Commit[]) {
    commits.forEach((commit) => {
        const commitDate = new Date(commit.commit.author.date).toISOString().split('T')[0]
        commitCountsPerDay[commitDate] = (commitCountsPerDay[commitDate] || 0) + 1
    })
}

