import { IUserRepository } from '../../domain/repositories/IUserRepository'
import {
  CreateUserParams,
  CreateUserResponse,
  ICreateUserUseCase,
} from '../../domain/useCases/ICreateUserUseCase'

export class CreateUserUseCaseImpl implements ICreateUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(params: CreateUserParams): Promise<CreateUserResponse> {
    return await this.userRepository.create(params)
  }
}
