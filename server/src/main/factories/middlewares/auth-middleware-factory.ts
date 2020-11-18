import { UserRepositoryImpl } from '../../../infra/repositories/UserRepositoryImpl'
import { AuthMiddleware } from '../../../presentation/middlewares/auth-middleware'
import { Middleware } from '../../../presentation/protocols/middleware'

export const makeAuthMiddlewareFactory = (): Middleware => {
  const userRepository = new UserRepositoryImpl()

  return new AuthMiddleware(userRepository)
}
