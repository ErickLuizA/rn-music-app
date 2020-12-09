import { UserRepositoryImpl } from '../../../data/repositories/UserRepositoryImpl'
import { LoginUserUseCaseImpl } from '../../../data/useCases/LoginUserUseCaseImpl'
import { ILoginUserUseCase } from '../../../domain/useCases/ILoginUserUseCase'
import { AxiosHttpClient } from '../../../infra/http/AxiosHttpClient'

export function makeLoginUser(): ILoginUserUseCase {
  const axiosHttpClient = new AxiosHttpClient()

  const userRepository = new UserRepositoryImpl(axiosHttpClient)

  return new LoginUserUseCaseImpl(userRepository)
}
