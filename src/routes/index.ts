import express from 'express'
import authRoutes from './oauth'
import userRoutes from './user'
import repoRoutes from './repos'
const router = express.Router()

router.use('/oauth', authRoutes)
router.use('/user', userRoutes)
router.use('/repos', repoRoutes )

export default router
