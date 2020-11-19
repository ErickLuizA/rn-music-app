import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeLoadUserControllerFactory } from '../factories/controllers/User/LoadUserControllerFactory'
import { auth } from '../middlewares/auth'

export default (router: Router): void => {
  router.get('/user', auth, adaptRoute(makeLoadUserControllerFactory()))
}
