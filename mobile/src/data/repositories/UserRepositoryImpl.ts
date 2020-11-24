import { User } from '../../domain/entities/User'
import { IUserRepository } from '../../domain/repositories/IUserRepository'
import {
  CreateUserParams,
  CreateUserResponse,
} from '../../domain/useCases/ICreateUserUseCase'
import { LoadUserParams } from '../../domain/useCases/ILoadUserUseCase'
import { IHttpClient } from '../protocols/IHttpClient'

export class UserRepositoryImpl implements IUserRepository {
  constructor(private readonly httpClient: IHttpClient) {}

  async create(params: CreateUserParams): Promise<CreateUserResponse> {
    return await this.httpClient.post('/register', params)
  }

  async load(params: LoadUserParams): Promise<User> {
    return await this.httpClient.post('/login', params)
  }
}
