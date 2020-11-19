import { LoadUserUseCaseImpl } from '../../../../data/useCases/User/LoadUserUseCaseImpl'
import { UserRepositoryImpl } from '../../../../infra/repositories/UserRepositoryImpl'
import { LoadUserController } from '../../../../presentation/controllers/User/LoadUserController'

export function makeLoadUserControllerFactory (): LoadUserController {
  const userRepository = new UserRepositoryImpl()

  const loadUserUseCase = new LoadUserUseCaseImpl(userRepository)

  const loadUserController = new LoadUserController(loadUserUseCase)

  return loadUserController
}
