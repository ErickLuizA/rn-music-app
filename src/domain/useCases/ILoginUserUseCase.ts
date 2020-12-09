import { User } from '../entities/User'

export interface LoginUserParams {
  email: string
  password: string
}

export interface ILoginUserUseCase {
  execute: (params: LoginUserParams) => Promise<User>
}
