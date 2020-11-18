import { UserModel } from '../../domain/models/User'
import database from '../query-builder/knex/connection'
import { IUserRepository } from '../../data/repositories/IUserRepository'

export class UserRepositoryImpl implements IUserRepository {
  async create (params: Pick<UserModel, 'name' | 'email' | 'password'>): Promise<UserModel> {
    return await database('users').insert(params).returning('*') as unknown as UserModel
  }

  async load (email: string): Promise<UserModel> {
    return await database('users').where('email', email).first()
  }
}
