import { adaptMiddleware } from '../adapters/express-middleware-adapter'
import { makeAuthMiddlewareFactory } from '../factories/middlewares/auth-middleware-factory'

export const auth = adaptMiddleware(makeAuthMiddlewareFactory())
