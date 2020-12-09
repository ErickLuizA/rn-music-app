import { User } from '../entities/User'

export interface CreateUserParams {
  name: string
  email: string
  password: string
}

export interface CreateUserResponse {
  token: string
  user: User
}

export interface ICreateUserUseCase {
  execute: (params: CreateUserParams) => Promise<CreateUserResponse>
}
