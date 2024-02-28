import QueryStream from 'pg-query-stream'
import { pgPool } from '../pgconfig'


async function getCommitData() {
    const client = await pgPool.connect()
    const query = new QueryStream(`
        SELECT repo.id AS "repoId", repo."repoName" as "repoName", owner."ownerUsername" as "ownerUsername", max(repo_commits."commitDate") as "lastCommitDate"
        FROM repo
        FULL JOIN owner on repo."ownerId" = owner.id
        FULL JOIN repo_commits on repo.id = repo_commits."repoId"
        GROUP BY repo.id, repo."repoName", owner."ownerUsername"`
    )
    const stream = client.query(query)
    for await (const row of stream) {
        console.log(row)
    }
    
}

export { getCommitData }