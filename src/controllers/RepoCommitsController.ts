import RepoCommitsRepository from "../repository/RepoCommitRepository"


export default class RepoCommitController {

    static async getCommitDataForRepo(repoId: number) {
        return await RepoCommitsRepository.getCommitDataForRepo(repoId)
    }
}
