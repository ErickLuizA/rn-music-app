export interface CreateUserParams {
  name: string
  email: string
  password: string
}

export interface CreateUserResponse {
  token: string
}

export interface ICreateUserUseCase {
  execute: (params: CreateUserParams) => Promise<CreateUserResponse>
}
