import { Router } from 'express'
import authMiddleware from '../../application/middlewares/authMiddlaware'
import { TeamController } from '../../application/controllers/TeamController'

export default (router: Router): void => {
  router.get('/team', authMiddleware, new TeamController().listTeams)
  router.post('/team', authMiddleware, new TeamController().create)
}
