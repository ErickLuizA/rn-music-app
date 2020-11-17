import { UserModel } from '../../../domain/models/User'
import { CreateUserUseCase } from '../../../domain/useCases/User/CreateUserUseCase'
import { Hasher } from '../../criptography/hasher'
import { CreateUserRepository } from '../../repositories/User/CreateUserRepository'
import { LoadUserByEmailRepository } from '../../repositories/User/LoadUserByEmailRepository'

export class CreateUserUseCaseImpl implements CreateUserUseCase {
  constructor (
    private readonly createUserRepository: CreateUserRepository,
    private readonly loadUserByEmailRepository: LoadUserByEmailRepository,
    private readonly hasher: Hasher
  ) {}

  async execute (user: Pick<UserModel, 'name' | 'avatar' | 'email' | 'password'>): Promise<UserModel> {
    const userAlreadyExists = await this.loadUserByEmailRepository.load(user.email)

    if (userAlreadyExists) {
      throw new Error('User already exists')
    }

    const hashedPassword = await this.hasher.hash(user.password)

    const newUser = await this.createUserRepository.create({
      name: user.name,
      email: user.email,
      password: hashedPassword,
      avatar: user.avatar
    })

    return newUser
  }
}
