import { CreateUserRepository } from '../../../data/repositories/User/CreateUserRepository'
import { UpdateAccessTokenRepository } from '../../../data/repositories/User/UpdateAccessTokenRepository'
import { LoadUserByEmailRepository } from '../../../data/repositories/User/LoadUserByEmailRepository'
import { UserModel } from '../../../domain/models/User'
import database from '../../query-builder/knex/connection'

export class UserRepositoryImpl implements CreateUserRepository, UpdateAccessTokenRepository, LoadUserByEmailRepository {
  async create (params: Pick<UserModel, 'name' | 'avatar' | 'email' | 'password'>): Promise<UserModel> {
    return await database('users').insert(params)
  }

  async updateAccessToken (userId: string, token: string): Promise<void> {}

  async load (email: string): Promise<UserModel> {
    return await database('users').where('email', email).first()
  }
}
