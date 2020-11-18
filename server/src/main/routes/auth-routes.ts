import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeAuthenticationController } from '../factories/controllers/Auth/AuthenticationControllerFactory'
import { makeCreateUserController } from '../factories/controllers/Auth/CreateUserControllerFactory'

export default (router: Router): void => {
  router.post('/register', adaptRoute(makeCreateUserController()))
  router.post('/login', adaptRoute(makeAuthenticationController()))
}
