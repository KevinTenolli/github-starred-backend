import express from 'express'
import authRoutes from './oauth'
import userRoutes from './user'
const router = express.Router()

router.use('/oauth', authRoutes)
router.use('/user', userRoutes)

export default router
