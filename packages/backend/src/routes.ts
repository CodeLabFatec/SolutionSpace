import { Router } from 'express'
import { AuthController } from './application/controllers/AuthController'
import { UserController } from './application/controllers/UserController'
import authMiddleware from './application/middlewares/authMiddlaware'
import { TeamController } from './application/controllers/TeamController'

const router = Router()

router.get('/', (req, res) => {
  res.send('Working!')
})

// Auth
router.post('/auth', new AuthController().authenticate)

// User
router.post('/login', authMiddleware, new UserController().login)
router.get('/listUsers', new UserController().listUser)
router.post('/createUser/:team_id', new UserController().create)

// Team
router.get('/listTeams', authMiddleware, new TeamController().listTeams)
router.get('/team/:id', authMiddleware, new TeamController().getTeamById)
router.post('/createTeam', authMiddleware, new TeamController().create)

export default router
