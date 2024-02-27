import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
import axiosInstance from '../middleware/axios'
import { StarredRepository } from '../models/StarredRepository'
import RepoController from '../controllers/RepoController'
dotenv.config()

const router = express.Router()

router.get('/:username/starredRepos', async (req: Request, res: Response) => {
    const accessToken = req.get('Authorization') as string
    const username = req.params.username
    if (!accessToken) {
        res.status(401).send({error: 'No Access Token'})
        return
    }
    if (!username) {
        res.status(401).send({error: 'No username'})
        return
    } 
    const config = {
        headers: {
            'Authorization': accessToken,
        }
    }
    const starredRepos:StarredRepository[] = await axiosInstance.get(`/users/${username}/starred`, undefined, config)
    const repoData = RepoController.filterRepoInformation(starredRepos)
    await RepoController.saveReposAndOwners(repoData)
    res.json(starredRepos)
})

export default router
