import { User } from '../../domain/entities/User'
import { IUserRepository } from '../../domain/repositories/IUserRepository'
import {
  CreateUserParams,
  CreateUserResponse,
} from '../../domain/useCases/ICreateUserUseCase'
import {
  LoginUserParams,
  LoginUserResponse,
} from '../../domain/useCases/ILoginUserUseCase'
import { IHttpClient } from '../protocols/IHttpClient'

export class UserRepositoryImpl implements IUserRepository {
  constructor(private readonly httpClient: IHttpClient) {}

  async create(params: CreateUserParams): Promise<CreateUserResponse> {
    return await this.httpClient.post('/register', params)
  }

  async login(params: LoginUserParams): Promise<LoginUserResponse> {
    return await this.httpClient.post('/login', params)
  }

  async load(): Promise<User> {
    return await this.httpClient.get('/user')
  }
}
