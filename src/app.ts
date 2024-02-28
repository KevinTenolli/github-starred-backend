import cors from 'cors'
import express from 'express'
import dotenv from 'dotenv'
import routes from './routes'
import { setupCronJob } from './cron/getRepoCommits'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
setupCronJob()


app.use('/', routes)

export default app
