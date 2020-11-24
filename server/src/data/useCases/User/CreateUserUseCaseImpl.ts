import { UserModel } from '../../../domain/models/User'
import { CreateUserUseCase } from '../../../domain/useCases/User/CreateUserUseCase'
import { Hasher } from '../../criptography/hasher'
import { IUserRepository } from '../../repositories/IUserRepository'

export class CreateUserUseCaseImpl implements CreateUserUseCase {
  constructor (
    private readonly userRepository: IUserRepository,
    private readonly hasher: Hasher
  ) {}

  async execute (
    user: Pick<UserModel, 'name' | 'avatar' | 'email' | 'password'>
  ): Promise<UserModel> {
    const userAlreadyExists = await this.userRepository.loadByEmail(user.email)

    if (userAlreadyExists?.email === user.email) {
      throw new Error('User already exists')
    }

    const hashedPassword = await this.hasher.hash(user.password)

    const newUser = await this.userRepository.create({
      name: user.name,
      email: user.email,
      password: hashedPassword
    })

    return newUser
  }
}
