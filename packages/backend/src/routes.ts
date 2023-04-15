import { Router } from 'express'
import { AuthController } from './application/controllers/AuthController'
import { UserController } from './application/controllers/UserController'
import authMiddleware from './application/middlewares/authMiddlaware'
import { TeamController } from './application/controllers/TeamController'
import { RatingController } from './application/controllers/RatingController'
import { RequestController } from './application/controllers/RequestController'
import { StatusConfigurationController } from './application/controllers/statusConfigurationController'
import { GroupController } from './application/controllers/GroupController'

const router = Router()

router.get('/', (req, res) => {
  res.send('Working!')
})

// Auth
router.post('/auth', new AuthController().authenticate)

// User
router.get('/listUsers', new UserController().listUser)
router.get('/user/:id', new UserController().getUserById)
router.post('/createUser/:team_id', new UserController().create)

// Team
router.get('/listTeams', authMiddleware, new TeamController().listTeams)
router.get('/team/:id', authMiddleware, new TeamController().getTeamById)
router.post('/createTeam', new TeamController().create)

// Request
router.get('/listRequests', authMiddleware, new RequestController().listRequests)
router.get('/listRequestsByUser/:user_id', authMiddleware, new RequestController().listRequestsByUser)
router.get('/listRequestsByTeam/:user_id', authMiddleware, new RequestController().listRequestsByTeam)
router.get('/request/:id', authMiddleware, new RequestController().getRequestById)
router.post('/createRequest/:userId', authMiddleware, new RequestController().create)

// Rating
router.get('/listRatings', authMiddleware, new RatingController().listRatings)
router.get('/rating/:id', authMiddleware, new RatingController().getRatingById)
router.get('/listRatingsByRequestId/:request_id', authMiddleware, new RatingController().listRatingsByRequestId)
router.post('/createRating/:requestId', authMiddleware, new RatingController().create)

// Status
router.get('/listStatus', authMiddleware, new StatusConfigurationController().listStatus)
router.get('/status/:status_id', authMiddleware, new StatusConfigurationController().getStatusById)
router.post('/createStatus', authMiddleware, new StatusConfigurationController().create)

// Group
router.get('/listGroups', authMiddleware, new GroupController().listGroups)
router.get('/group/:id', authMiddleware, new GroupController().getGroupById)
router.post('/createGroup', authMiddleware, new GroupController().create)
router.put('/updateGroup', authMiddleware, new GroupController().edit)
router.delete('/deleteGroup/:id', authMiddleware, new GroupController().delete)


export default router
