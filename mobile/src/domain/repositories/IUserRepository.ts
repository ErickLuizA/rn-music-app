import { User } from '../entities/User'
import {
  CreateUserParams,
  CreateUserResponse,
} from '../useCases/ICreateUserUseCase'
import { LoginUserParams } from '../useCases/ILoginUserUseCase'

export interface IUserRepository {
  create: (user: CreateUserParams) => Promise<CreateUserResponse>

  login: (user: LoginUserParams) => Promise<User> // This does not return a full user, that's why the load method bellow is necessary

  load: () => Promise<User>
}
