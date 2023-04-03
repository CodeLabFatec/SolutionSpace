import { Router } from 'express'
import authMiddleware from '../../application/middlewares/authMiddlaware'
import { UserController } from '../../application/controllers/UserController'

export default (router: Router): void => {
  router.post('/login', authMiddleware, new UserController().login)
  router.get('/user', new UserController().listUser)
  router.post('/user', new UserController().create)
}
