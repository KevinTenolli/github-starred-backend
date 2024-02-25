import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
import axiosInstance from '../middleware/axios'
import { GitHubUser } from '../models/githubUser'
import { AccessTokenResponse } from '../models/tokenResponse'
dotenv.config()

const router = express.Router()

router.get('/getAccessToken', async (req: Request, res: Response):Promise<void> => {
   const params = {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code: req.query.code as string,
   }

   const config = {
      baseURL: 'https://github.com',
      headers: {
         'Accept': 'application/json',
      }
   }
   
   const response: AccessTokenResponse = await axiosInstance.post('/login/oauth/access_token', params, config)
   if (response.error) {
      res.status(401).send({error: 'Login failed'})
   } else {
      res.status(200).json(response)
   }
   
})

router.get('/getUserData', async (req: Request, res: Response): Promise<void> => {
   const accessToken = req.get('Authorization') as string
   if (!accessToken) {
      res.status(401).send({error: 'No Access Token'})
      return
   }
   const config = {
      headers: {
         'Authorization': accessToken,
      }
   }
   try {
      const userData:GitHubUser = await axiosInstance.get('/user', undefined , config)
      res.json(userData)
   } catch (error){
      res.status(401).send({error: 'Cannot get user Info'})
   }
})

export default router
