import { AuthenticationUseCaseImpl } from '../../../../data/useCases/User/AuthenticationUseCaseImpl'
import { BcryptAdapter } from '../../../../infra/cryptography/BcryptAdapter'
import { JwtAdapter } from '../../../../infra/cryptography/JwtAdapter'
import { UserRepositoryImpl } from '../../../../infra/repositories/UserRepositoryImpl'
import { AuthenticationController } from '../../../../presentation/controllers/Auth/AuthenticationController'
import { Validator } from '../../../../validation/Validator'

export function makeAuthenticationController (): AuthenticationController {
  const userRepository = new UserRepositoryImpl()
  const hashComparer = new BcryptAdapter()
  const encrypter = new JwtAdapter(process.env.JWT_SECRET!)

  const authenticationUseCaseImpl = new AuthenticationUseCaseImpl(
    userRepository,
    hashComparer,
    encrypter
  )

  const validator = new Validator()

  const authenticationController = new AuthenticationController(
    validator,
    authenticationUseCaseImpl
  )

  return authenticationController
}
