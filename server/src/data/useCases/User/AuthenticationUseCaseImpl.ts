import { AuthenticationModel } from '../../../domain/models/Authentication'
import { AuthenticationParams, AuthenticationUseCase } from '../../../domain/useCases/User/AuthenticationUseCase'
import { Encrypter } from '../../criptography/encrypter'
import { HashComparer } from '../../criptography/hash-comparer'
import { IUserRepository } from '../../repositories/IUserRepository'

export class AuthenticationUseCaseImpl implements AuthenticationUseCase {
  constructor (
    private readonly userRepository: IUserRepository,
    private readonly hashComparer: HashComparer,
    private readonly encrypter: Encrypter
  ) {}

  async execute (authenticationParams: AuthenticationParams): Promise<AuthenticationModel | Error> {
    const user = await this.userRepository.load(authenticationParams.email)

    if (user) {
      const isValid = await this.hashComparer.compare(authenticationParams.password, user.password)

      if (isValid) {
        const accessToken = await this.encrypter.encrypt(user.id)

        return { accessToken }
      }
    }
    throw new Error('Invalid credentials')
  }
}
