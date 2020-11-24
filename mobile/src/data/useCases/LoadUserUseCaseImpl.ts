import { User } from '../../domain/entities/User'
import { IUserRepository } from '../../domain/repositories/IUserRepository'
import {
  LoadUserParams,
  ILoadUserUseCase,
} from '../../domain/useCases/ILoadUserUseCase'

export class LoadUserUseCaseImpl implements ILoadUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(params: LoadUserParams): Promise<User> {
    try {
      return await this.userRepository.load(params)
    } catch (error) {
      return error
    }
  }
}
