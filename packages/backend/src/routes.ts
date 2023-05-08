import { Router } from 'express';
import { AuthController } from './controllers/AuthController';
import { UserController } from './controllers/UserController';
import authMiddleware from './middlewares/authMiddlaware';
import { TeamController } from './controllers/TeamController';
import { RatingController } from './controllers/RatingController';
import { RequestController } from './controllers/RequestController';
import { StatusConfigurationController } from './controllers/statusConfigurationController';
import { GroupController } from './controllers/GroupController';
import { NotificationsController } from './controllers/NotificationsController';

const router = Router();

router.get('/', (req, res) => {
    res.send('Working!');
});

// Auth
router.post('/auth', new AuthController().authenticate);
router.post('/verifyToken/:authorization', new AuthController().verifyToken);

// User
router.get('/listUsers', new UserController().listUser);
router.get('/user/:id', new UserController().getUserById);
router.post('/createUser', new UserController().create);
router.put('/updateUser/:user_id', authMiddleware, new UserController().editUser);
router.delete('/deleteUser/:user_id', authMiddleware, new UserController().deleteUser);

// Team
router.get('/listTeams', authMiddleware, new TeamController().listTeams);
router.get('/team/:id', authMiddleware, new TeamController().getTeamById);
router.post('/createTeam', new TeamController().create);
router.put('/updateTeam/:team_id', authMiddleware, new TeamController().editTeam);
router.delete('/deleteTeam/:team_id', authMiddleware, new TeamController().deleteTeam);

// Request
router.get('/listRequests', authMiddleware, new RequestController().listRequests);
router.get('/listRequestsByUser/:user_id', authMiddleware, new RequestController().listRequestsByUser);
router.get('/listRequestsByTeam/:user_id', authMiddleware, new RequestController().listRequestsByTeam);
router.get('/request/:id', authMiddleware, new RequestController().getRequestById);
router.post('/createRequest/:userId', authMiddleware, new RequestController().create);
router.post('/listArchivedRequests', authMiddleware, new RequestController().listArchivedRequests)
router.post('/unarchiveRequest/:request_id', authMiddleware, new RequestController().unarchiveRequest)

// Rating
router.get('/listRatings', authMiddleware, new RatingController().listRatings);
router.get('/rating/:id', authMiddleware, new RatingController().getRatingById);
router.get('/listRatingsByRequestId/:request_id', authMiddleware, new RatingController().listRatingsByRequestId);
router.post('/createRating/:requestId', authMiddleware, new RatingController().create);

// Status
router.get('/listStatus', authMiddleware, new StatusConfigurationController().listStatus);
router.get('/status/:status_id', authMiddleware, new StatusConfigurationController().getStatusById);
router.post('/createStatus', authMiddleware, new StatusConfigurationController().create);

// Group
router.get('/listGroups', authMiddleware, new GroupController().listGroups)
router.get('/group/:id', authMiddleware, new GroupController().getGroupById)
router.get('/getGroupsByTeam/:team_id', authMiddleware, new GroupController().getGroupsByTeam)
router.get('/group/checkPermissions/:group_id', authMiddleware, new GroupController().checkGroupPermission)
router.post('/createGroup', authMiddleware, new GroupController().create)
router.put('/updateGroup', authMiddleware, new GroupController().edit)
router.delete('/deleteGroup/:id', authMiddleware, new GroupController().delete)

// Notifications
router.get('/getNotificationById/:notification_id', authMiddleware, new NotificationsController().getNotificationById)
router.get('/getNotificationsByUser/:user_id', authMiddleware, new NotificationsController().getNotificationsByUser)
router.get('/updateNotification/notification_id', authMiddleware, new NotificationsController().updateNotification)
router.get('/updateAllNotifications/:user_id', authMiddleware, new NotificationsController().updateAllNotifications)

export default router;