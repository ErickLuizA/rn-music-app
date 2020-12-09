import { UserRepositoryImpl } from '../../../data/repositories/UserRepositoryImpl'
import { LoadUserUseCaseImpl } from '../../../data/useCases/LoadUserUseCaseImpl'
import { ILoadUserUseCase } from '../../../domain/useCases/ILoadUserUseCase'
import { AxiosHttpClient } from '../../../infra/http/AxiosHttpClient'

export function makeLoadUser(): ILoadUserUseCase {
  const axiosHttpClient = new AxiosHttpClient()

  const userRepository = new UserRepositoryImpl(axiosHttpClient)

  return new LoadUserUseCaseImpl(userRepository)
}
