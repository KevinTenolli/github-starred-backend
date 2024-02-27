import { Owner } from "../entity/owner"
import { Repo } from "../entity/repo"
import { StarredRepositoryIdentifierData, StarredRepository } from "../models/StarredRepository"
import OwnerRepository from "../repository/OwnerRepository"
import RepoRepository from "../repository/RepoRepository"

export default class RepoController{

    static filterRepoInformation(data: StarredRepository[]): StarredRepositoryIdentifierData[] {
        return data.map((repo: StarredRepository) => {
            const repoId = repo.id
            const repoName = repo.name
            const ownerId = repo.owner.id
            const ownerUsername = repo.owner.login
            return { repoId, repoName, ownerId, ownerUsername }
        })
    }

    static async saveReposAndOwners(data:StarredRepositoryIdentifierData[]) {
        const ownerList:Owner[] = []
        const repoList:Repo[] = []
        data.forEach((entry) => {
            repoList.push({
                id: entry.repoId,
                repoName: entry.repoName,
                ownerId: entry.ownerId 
            })
            ownerList.push({
                id: entry.ownerId,
                ownerUsername: entry.ownerUsername,
            })
        })
        console.log(repoList)
        await OwnerRepository.saveOwners(ownerList)
        await RepoRepository.saveRepos(repoList)
    }
}
