import { UserModel } from '../../domain/models/User'
import database from '../query-builder/knex/connection'
import { IUserRepository } from '../../data/repositories/IUserRepository'

export class UserRepositoryImpl implements IUserRepository {
  async create (params: Pick<UserModel, 'name' | 'email' | 'password'>): Promise<UserModel> {
    const result = await database('users').insert(params).returning('*') as any

    if (result.id === undefined) {
      return {
        id: result[0],
        name: '',
        email: '',
        password: ''
      }
    }

    return result
  }

  async loadByEmail (email: string): Promise<UserModel> {
    return await database('users').where('email', email).first()
  }

  async loadById (id: string): Promise<UserModel> {
    return await database('users').where('id', id).first()
  }

  async updateToken (userId: string, token: string): Promise<void> {
    return await database('users').where('id', userId).update('token', token)
  }

  async loadUserByToken (token: string): Promise<UserModel> {
    return await database('users').where('token', token).first()
  }
}
