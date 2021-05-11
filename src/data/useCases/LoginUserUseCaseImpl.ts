import { IUserRepository } from '../../domain/repositories/IUserRepository'
import {
  LoginUserParams,
  ILoginUserUseCase,
  LoginUserResponse,
} from '../../domain/useCases/ILoginUserUseCase'

export class LoginUserUseCaseImpl implements ILoginUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(params: LoginUserParams): Promise<LoginUserResponse> {
    return await this.userRepository.login(params)
  }
}
