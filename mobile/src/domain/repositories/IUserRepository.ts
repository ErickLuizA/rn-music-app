import { User } from '../entities/User'
import {
  CreateUserParams,
  CreateUserResponse,
} from '../useCases/ICreateUserUseCase'
import { LoadUserParams } from '../useCases/ILoadUserUseCase'

export interface IUserRepository {
  create: (user: CreateUserParams) => Promise<CreateUserResponse>

  load: (user: LoadUserParams) => Promise<User>
}
