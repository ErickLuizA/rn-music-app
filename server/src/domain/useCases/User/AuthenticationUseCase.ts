import { AuthenticationModel } from '../../models/Authentication'

export interface AuthenticationParams {
  email: string
  password: string
}

export interface AuthenticationUseCase {
  execute: (authenticationParams: AuthenticationParams) => Promise<AuthenticationModel | Error>
}
