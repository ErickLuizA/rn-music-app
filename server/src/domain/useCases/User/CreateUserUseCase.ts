import { UserModel } from '../../models/User'

export type UserParams = Omit<UserModel, 'id'>

export interface CreateUserUseCase {
  execute: (user: UserParams) => Promise<UserModel>
}
