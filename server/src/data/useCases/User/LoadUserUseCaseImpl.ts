import { UserModel } from '../../../domain/models/User'
import { LoadUserUseCase } from '../../../domain/useCases/User/LoadUserUseCase'
import { IUserRepository } from '../../repositories/IUserRepository'

export class LoadUserUseCaseImpl implements LoadUserUseCase {
  constructor (
    private readonly userRepository: IUserRepository
  ) {}

  async byEmail (email: string): Promise<UserModel> {
    const user = await this.userRepository.loadByEmail(email)

    return user
  }

  async byId (id: string): Promise<UserModel> {
    const user = await this.userRepository.loadById(id)

    return user
  }
}
