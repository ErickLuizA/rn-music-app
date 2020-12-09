import { User } from '../../domain/entities/User'
import { IUserRepository } from '../../domain/repositories/IUserRepository'
import { ILoadUserUseCase } from '../../domain/useCases/ILoadUserUseCase'

export class LoadUserUseCaseImpl implements ILoadUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(): Promise<User> {
    return await this.userRepository.load()
  }
}
