import { mockCreateUserParams, mockUserModel } from '../../../domain/test/mock-user'
import { CreateUserUseCase } from '../../../domain/useCases/User/CreateUserUseCase'
import { MockHasher } from '../../test/mock-criptography'
import { MockUserRepository } from '../../test/mock-user-repository'
import { CreateUserUseCaseImpl } from './CreateUserUseCaseImpl'

interface ISut {
  createUserUseCase: CreateUserUseCase
  userRepository: MockUserRepository
  hasher: MockHasher
}

function makeSut (): ISut {
  const userRepository = new MockUserRepository()
  const hasher = new MockHasher()

  const createUserUseCase = new CreateUserUseCaseImpl(userRepository, hasher)

  return {
    createUserUseCase,
    userRepository,
    hasher
  }
}

describe('CreateUser UseCase', () => {
  test('should return user on create success', async () => {
    const { createUserUseCase, userRepository } = makeSut()

    const createUserParams = mockCreateUserParams()

    const user = await createUserUseCase.execute(createUserParams)

    expect(user).toEqual(userRepository.userModel)
  })

  test('should return error on user already exists', () => {
    const { createUserUseCase, userRepository } = makeSut()

    const mock = mockUserModel()

    userRepository.userModel = mock

    const createUserParams = mock

    const promise = createUserUseCase.execute(createUserParams)

    expect(promise).rejects.toThrow() // eslint-disable-line @typescript-eslint/no-floating-promises
  })

  test('should call create in userRepository with correct values', async () => {
    const { createUserUseCase, userRepository, hasher } = makeSut()

    const createUserParams = mockCreateUserParams()

    await createUserUseCase.execute(createUserParams)

    expect(userRepository.createUserParams).toEqual({
      name: createUserParams.name,
      email: createUserParams.email,
      password: hasher.digest
    })
  })

  test('should call loadByEmail in userRepository with correct values', async () => {
    const { createUserUseCase, userRepository } = makeSut()

    const createUserParams = mockCreateUserParams()

    await createUserUseCase.execute(createUserParams)

    expect(userRepository.email).toEqual(createUserParams.email)
  })

  test('should call hash in hasher with correct values', async () => {
    const { createUserUseCase, hasher } = makeSut()

    const createUserParams = mockCreateUserParams()

    await createUserUseCase.execute(createUserParams)

    expect(hasher.plaintext).toEqual(createUserParams.password)
  })
})
