import { Encrypter } from '../../../data/criptography/encrypter'
import { IUserRepository } from '../../../data/repositories/IUserRepository'
import { CreateUserUseCase } from '../../../domain/useCases/User/CreateUserUseCase'
import { badRequest, badRequests, ok, serverError } from '../../helpers/http-helper'
import { HttpRequest, HttpResponse } from '../../protocols/http'
import { Validation } from '../../protocols/validation'

export class CreateUserController {
  constructor (
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly validator: Validation,
    private readonly encrypter: Encrypter,
    private readonly userRepository: IUserRepository
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { name, avatar, email, password } = httpRequest.body

    const data = { name, avatar, email, password }

    const error = this.validator.validate(data)

    if (error.length > 0) {
      if (error.length > 1) {
        return badRequests(error)
      }
      return badRequest(error[0])
    }

    try {
      const user = await this.createUserUseCase.execute({ name, email, password })

      const token = await this.encrypter.encrypt(user.id)

      await this.userRepository.updateToken(user.id, token)

      return ok({ user, token })
    } catch (error) {
      if (error.message === 'User already exists') {
        return badRequest(error)
      }

      return serverError(error)
    }
  }
}
