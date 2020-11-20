import { UserModel } from '../../domain/models/User'
import { mockUserModel } from '../../domain/test/mock-user'
import { CreateUserParams } from '../../domain/useCases/User/CreateUserUseCase'
import { IUserRepository } from '../repositories/IUserRepository'

export class MockUserRepository implements IUserRepository {
  userModel = mockUserModel()

  createUserParams: CreateUserParams
  email: string
  id: string
  userId: string
  token: string

  async create (params: CreateUserParams): Promise<UserModel> {
    this.createUserParams = params

    return this.userModel
  }

  async loadByEmail (email: string): Promise<UserModel> {
    this.email = email

    return this.userModel
  }

  async loadById (id: string): Promise<UserModel> {
    this.id = id

    return this.userModel
  }

  async updateToken (userId: string, token: string): Promise<void> {
    this.userId = userId
    this.token = token
  }

  async loadUserByToken (token: string): Promise<UserModel> {
    this.token = token

    return this.userModel
  }
}
