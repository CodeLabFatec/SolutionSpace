import { Router } from 'express';
import { AuthController } from './controllers/AuthController';
import { UserController } from './controllers/UserController';
import authMiddleware from './middlewares/authMiddlaware';
import { TeamController } from './controllers/TeamController';
import { RatingController } from './controllers/RatingController';
import { RequestController } from './controllers/RequestController';
import { StatusConfigurationController } from './controllers/statusConfigurationController';

const router = Router();

router.get('/', (req, res) => {
    res.send('Working!');
});

// Auth
router.post('/auth', new AuthController().authenticate);

// User
router.get('/listUsers', new UserController().listUser);
router.get('/user/:id', new UserController().getUserById);
router.post('/createUser/:team_id', new UserController().create);
router.put('/updateUser/:user_id',authMiddleware, new UserController().editUser);
router.delete('/deleteUser/:user_id',authMiddleware, new UserController().deleteUser);

// Team
router.get('/listTeams', authMiddleware, new TeamController().listTeams);
router.get('/team/:id', authMiddleware, new TeamController().getTeamById);
router.post('/createTeam', new TeamController().create);

// Request
router.get('/listRequests', authMiddleware, new RequestController().listRequests);
router.get('/listRequestsByUser/:user_id', authMiddleware, new RequestController().listRequestsByUser);
router.get('/listRequestsByTeam/:user_id', authMiddleware, new RequestController().listRequestsByTeam);
router.get('/request/:id', authMiddleware, new RequestController().getRequestById);
router.post('/createRequest/:userId', authMiddleware, new RequestController().create);

// Rating
router.get('/listRatings', authMiddleware, new RatingController().listRatings);
router.get('/rating/:id', authMiddleware, new RatingController().getRatingById);
router.get('/listRatingsByRequestId/:request_id', authMiddleware, new RatingController().listRatingsByRequestId);
router.post('/createRating/:requestId', authMiddleware, new RatingController().create);

// Status
router.get('/listStatus', authMiddleware, new StatusConfigurationController().listStatus);
router.get('/status/:status_id', authMiddleware, new StatusConfigurationController().getStatusById);
router.post('/createStatus', authMiddleware, new StatusConfigurationController().create);

export default router;