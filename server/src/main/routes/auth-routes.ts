import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeCreateUserController } from '../factories/controllers/Auth/CreateUserControllerFactory'

export default (router: Router): void => {
  router.post('/register', adaptRoute(makeCreateUserController()))
}
