import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
import axios from 'axios'
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
        console.log(username)
        res.status(401).send({error: 'No username'})
        return
    }
    const response = await axios.get(`https://api.github.com/users/${username}/starred`, {
        headers: {
            Authorization: accessToken
        }
    })
    res.json(response.data)
})

export default router
