import { Router } from 'express'
import { UserController } from './controllers/UserController'
import { AuthController } from './controllers/AuthController'
import authMiddleware from './middlewares/authMiddlaware'
import { GroupController } from './controllers/GroupController'

const router = Router()

router.get('/', (req, res) => {
  res.send('Working!')
})

// Auth
router.post('/auth', new AuthController().authenticate)

// User
router.post('/login', authMiddleware, new UserController().login)
router.get('/user', new UserController().listUser)
router.post('/user', new UserController().create)

// Group
router.get('/group', authMiddleware, new GroupController().listGroups)
router.post('/group', authMiddleware, new GroupController().create)

export default router
