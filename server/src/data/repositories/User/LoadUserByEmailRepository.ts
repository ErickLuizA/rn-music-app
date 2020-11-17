import { UserModel } from '../../../domain/models/User'

export interface LoadUserByEmailRepository {
  execute: (email: string) => Promise<UserModel>
}
