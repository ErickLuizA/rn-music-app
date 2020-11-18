import { UserModel } from '../../models/User'

export interface UserParams {
  name: string
  email: string
  password: string
}

export interface CreateUserUseCase {
  execute: (user: UserParams) => Promise<UserModel>
}
