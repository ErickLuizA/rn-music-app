import faker from 'faker'
import { CreateUserParams } from '../useCases/User/CreateUserUseCase'
import { AuthenticationParams } from '../useCases/User/AuthenticationUseCase'
import { UserModel } from '../models/User'

export function mockCreateUserParams (): CreateUserParams {
  return {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password()
  }
}

export function mockAuthenticationParams (): AuthenticationParams {
  return {
    email: faker.internet.email(),
    password: faker.internet.password()
  }
}

export function mockUserModel (): UserModel {
  return {
    id: faker.random.uuid(),
    name: faker.name.findName(),
    avatar: faker.internet.avatar(),
    email: faker.internet.email(),
    password: faker.internet.password()
  }
}
