import { UserModel } from '../../models/User'

export interface LoadUserUseCase {
  execute: (email: string) => Promise<UserModel>
}
