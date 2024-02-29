import express, { Request, Response } from 'express'
import RepoCommitController from '../controllers/RepoCommitsController'

const router = express.Router()

router.get('/repo/:repoId', async (req: Request, res: Response) => {
    const repoId = req.params.repoId
    if (!repoId) {
        res.status(401).send({error: 'No repoId'})
        return
    }
    const data = await RepoCommitController.getCommitDataForRepo(parseInt(repoId))
    res.json(data)
  
})

export default router
