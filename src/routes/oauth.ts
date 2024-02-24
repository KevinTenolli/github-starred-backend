import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
import axios from 'axios'
dotenv.config()

const router = express.Router()

router.get('/getAccessToken', async (req: Request, res: Response):Promise<void> => {
   const params = {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code: req.query.code as string,
   }

   const headers = {
      'Accept': 'application/json',
   }

   const response = await axios.post('https://github.com/login/oauth/access_token', null, {
      params,
      headers,
   })

   if (response.data.error) {
      res.status(502).json({error: 'An error occurred, could not complete authentication'})
   } else {
      res.status(200).json(response.data)
   }
})

router.get('/getUserData', async (req: Request, res: Response): Promise<void> => {
   const accessToken = req.get('Authorization') as string
   if (!accessToken) {
      res.status(401).send({error: 'Not authorized'})
      return
   }
   console.log(accessToken)
   try {
      const userData = await axios.get('https://api.github.com/user', {
         headers: {
            'Authorization': accessToken,
         }
      })
      res.json(userData.data)
   } catch (error){
      res.status(401).send({error: 'Not authorized'})
   }
})

export default router
