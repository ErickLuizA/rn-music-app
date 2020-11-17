import { UserModel } from '../../../domain/models/User'
import { LoadUserUseCase } from '../../../domain/useCases/User/LoadUserUseCase'
import { LoadUserByEmailRepository } from '../../repositories/User/LoadUserByEmailRepository'

export class LoadUserUseCaseImpl implements LoadUserUseCase {
  constructor (private readonly loadUserByEmailRepository: LoadUserByEmailRepository) {}

  async execute (email: string): Promise<UserModel> {
    const user = await this.loadUserByEmailRepository.execute(email)

    return user
  }
}
