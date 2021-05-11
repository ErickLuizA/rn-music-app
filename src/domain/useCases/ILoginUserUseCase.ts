export interface LoginUserParams {
  email: string
  password: string
}

export interface LoginUserResponse {
  accessToken: string
}

export interface ILoginUserUseCase {
  execute: (params: LoginUserParams) => Promise<LoginUserResponse>
}
