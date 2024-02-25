import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
import axiosInstance from '../middleware/axios'
import { StarredRepository, StarredRepositoryIdentifierData } from '../models/starredRepository'
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
    const repoData: StarredRepositoryIdentifierData[] = starredRepos.map((repo: StarredRepository) => {
        const repoId = repo.id
        const repoName = repo.name
        const ownerId = repo.owner.id
        const ownerUsername = repo.owner.login
        return { repoId, repoName, ownerId, ownerUsername }
    })
    console.log(repoData)
    res.json(starredRepos)
})

export default router
