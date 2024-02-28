import { RepoCommits } from "../entity/RepoCommits.entity"
import DatabaseSource from "../ormconfig"

export default class RepoCommitsRepository {

    static async getCommitDataForRepo(repoId: number) {
        const repoCommitsRepository = DatabaseSource.getRepository(RepoCommits)
        return await repoCommitsRepository.find({
            where: { repoId: repoId },
            order: {
                commitDate: 'ASC',
            }
        })
    }
    
    static async saveRepoCommits(owners: RepoCommits[]) {
        const repoCommitsRepository = DatabaseSource.getRepository(RepoCommits)
      
        await repoCommitsRepository.save(owners)
    }
}

