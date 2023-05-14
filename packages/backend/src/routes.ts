import { Router } from 'express';
import authMiddleware from './middlewares/authMiddlaware';
import { authController, groupController, notificationsController, ratingController, requestController, statusConfigurationController, teamController, userController } from './controllers';

const router = Router();

router.get('/', (req, res) => {
    res.send('Working!');
});

// Auth
router.post('/auth', authController.authenticate);
router.post('/verifyToken/:authorization', authController.verifyToken);

// User
router.get('/listUsers', authMiddleware, userController.listUser);
router.get('/user/:id', authMiddleware, userController.getUserById);
router.post('/createUser', authMiddleware, userController.create);
router.put('/updateUser/:user_id', authMiddleware, userController.editUser);
router.delete('/deleteUser/:user_id', authMiddleware, userController.deleteUser);

// Team
router.get('/listTeams', authMiddleware, teamController.listTeams);
router.get('/team/:id', authMiddleware, teamController.getTeamById);
router.post('/createTeam', authMiddleware, teamController.create);
router.put('/updateTeam/:team_id', authMiddleware, teamController.editTeam);
router.delete('/deleteTeam/:team_id', authMiddleware, teamController.deleteTeam);

// Request
router.get('/listRequests', authMiddleware, requestController.listRequests);
router.get('/listRequestsByUser/:user_id', authMiddleware, requestController.listRequestsByUser);
router.get('/listRequestsByTeam/:user_id', authMiddleware, requestController.listRequestsByTeam);
router.get('/request/:id', authMiddleware, requestController.getRequestById);
router.post('/createRequest/:userId', authMiddleware, requestController.create);
router.get('/listArchivedRequests', authMiddleware, requestController.listArchivedRequests)
router.post('/unarchiveRequest/:request_id', authMiddleware, requestController.unarchiveRequest)

// Rating
router.get('/listRatings', authMiddleware, ratingController.listRatings);
router.get('/rating/:id', authMiddleware, ratingController.getRatingById);
router.get('/listRatingsByRequestId/:request_id', authMiddleware, ratingController.listRatingsByRequestId);
router.post('/createRating/:requestId', authMiddleware, ratingController.create);

// Status
router.get('/listStatus', authMiddleware, statusConfigurationController.listStatus);
router.get('/status/:status_id', authMiddleware, statusConfigurationController.getStatusById);
router.get('/statusByRequestStep/:requestStep', authMiddleware, statusConfigurationController.getStatusRequestStep);
router.post('/createStatus', authMiddleware, statusConfigurationController.create);
router.put('/updateStatus', authMiddleware, statusConfigurationController.updateStatus)

// Group
router.get('/listGroups', authMiddleware, groupController.listGroups)
router.get('/group/:id', authMiddleware, groupController.getGroupById)
router.get('/getGroupsByTeam/:team_id', authMiddleware, groupController.getGroupsByTeam)
router.get('/group/checkPermissions/:group_id', authMiddleware, groupController.checkGroupPermission)
router.post('/createGroup', authMiddleware, groupController.create)
router.put('/updateGroup', authMiddleware, groupController.edit)
router.delete('/deleteGroup/:id', authMiddleware, groupController.delete)

// Notifications
router.get('/getNotificationById/:notification_id', authMiddleware, notificationsController.getNotificationById)
router.get('/getNotificationsByUser/:user_id', authMiddleware, notificationsController.getNotificationsByUser)
router.get('/updateNotification/notification_id', authMiddleware, notificationsController.updateNotification)
router.get('/updateAllNotifications/:user_id', authMiddleware, notificationsController.updateAllNotifications)

export default router;