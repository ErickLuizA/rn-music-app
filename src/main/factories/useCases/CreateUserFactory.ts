import { UserRepositoryImpl } from '../../../data/repositories/UserRepositoryImpl'
import { CreateUserUseCaseImpl } from '../../../data/useCases/CreateUserUseCaseImpl'
import { ICreateUserUseCase } from '../../../domain/useCases/ICreateUserUseCase'
import { AxiosHttpClient } from '../../../infra/http/AxiosHttpClient'

export function makeCreateUser(): ICreateUserUseCase {
  const axiosHttpClient = new AxiosHttpClient()

  const userRepository = new UserRepositoryImpl(axiosHttpClient)

  return new CreateUserUseCaseImpl(userRepository)
}
