import { User } from '../../domain/entities/User'
import { IUserRepository } from '../../domain/repositories/IUserRepository'
import {
  LoginUserParams,
  ILoginUserUseCase,
} from '../../domain/useCases/ILoginUserUseCase'

export class LoginUserUseCaseImpl implements ILoginUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(params: LoginUserParams): Promise<User> {
    try {
      return await this.userRepository.login(params)
    } catch (error) {
      return error
    }
  }
}
