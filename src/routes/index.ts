import express from 'express'
import testRoutes from './oauth'

const router = express.Router()

router.use('/oauth', testRoutes)

export default router
