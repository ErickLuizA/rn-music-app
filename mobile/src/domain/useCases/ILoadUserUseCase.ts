import { User } from '../entities/User'

export interface LoadUserParams {
  email: string
  password: string
}

export interface ILoadUserUseCase {
  execute: (params: LoadUserParams) => Promise<User>
}
