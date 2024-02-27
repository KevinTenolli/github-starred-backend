import { Repo } from "../entity/repo"
import DatabaseSource from "../ormconfig"

export default class RepoRepository {
    
    static async getRepo(id: number) {
        const userRepository = DatabaseSource.getRepository(Repo)
        const repo = await userRepository.findOneBy({
           id
        })
        return repo
    }
    
    static async saveRepos(repos: Repo[]) {
        const repoRepository = DatabaseSource.getRepository(Repo)
        await repoRepository.save(repos)
    }
}
