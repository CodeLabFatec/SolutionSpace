import { AuthController } from '../../application/controllers/AuthController'
import { Router } from 'express'

export default (router: Router): void => {
  router.post('/auth', new AuthController().authenticate)
}
