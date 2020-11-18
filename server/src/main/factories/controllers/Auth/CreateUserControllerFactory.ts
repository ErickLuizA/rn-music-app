import { CreateUserUseCaseImpl } from '../../../../data/useCases/User/CreateUserUseCaseImpl'
import { BcryptAdapter } from '../../../../infra/cryptography/BcryptAdapter'
import { UserRepositoryImpl } from '../../../../infra/repositories/UserRepositoryImpl'
import { CreateUserController } from '../../../../presentation/controllers/Auth/CreateUserController'
import { Validator } from '../../../../validation/Validator'

export function makeCreateUserController (): CreateUserController {
  const userRepositoryImpl = new UserRepositoryImpl()
  const bcryptAdapter = new BcryptAdapter()

  const createUserUseCaseImpl = new CreateUserUseCaseImpl(
    userRepositoryImpl,
    bcryptAdapter
  )

  const validator = new Validator()

  const createUserController = new CreateUserController(createUserUseCaseImpl, validator)

  return createUserController
}
