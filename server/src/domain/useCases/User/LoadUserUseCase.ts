import { UserModel } from '../../models/User'

export interface LoadUserUseCase {
  execute: (userId: number) => Promise<UserModel>
}
