import { User } from '../entities/User'
import {
  CreateUserParams,
  CreateUserResponse,
} from '../useCases/ICreateUserUseCase'
import {
  LoginUserParams,
  LoginUserResponse,
} from '../useCases/ILoginUserUseCase'

export interface IUserRepository {
  create: (user: CreateUserParams) => Promise<CreateUserResponse>

  login: (user: LoginUserParams) => Promise<LoginUserResponse>

  load: () => Promise<User>
}
