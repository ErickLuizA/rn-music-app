import { AuthenticationModel } from '../../../domain/models/Authentication'
import { AuthenticationParams, AuthenticationUseCase } from '../../../domain/useCases/User/AuthenticationUseCase'
import { Encrypter } from '../../criptography/encrypter'
import { HashComparer } from '../../criptography/hash-comparer'
import { LoadUserByEmailRepository } from '../../repositories/User/LoadUserByEmailRepository'
import { UpdateAccessTokenRepository } from '../../repositories/User/UpdateAccessTokenRepository'

export class AuthenticationUseCaseImpl implements AuthenticationUseCase {
  constructor (
    private readonly loadUserByEmailRepository: LoadUserByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly updateAccessTokenRepository: UpdateAccessTokenRepository,
    private readonly encrypter: Encrypter
  ) {}

  async execute (authenticationParams: AuthenticationParams): Promise<AuthenticationModel> {
    const user = await this.loadUserByEmailRepository.execute(authenticationParams.email)

    if (user) {
      const isValid = this.hashComparer.compare(authenticationParams.password, user.password)

      if (isValid) {
        const accessToken = await this.encrypter.encrypt(user.id)

        await this.updateAccessTokenRepository.updateAccessToken(user.id, accessToken)

        return { accessToken }
      }
    }
  }
}
