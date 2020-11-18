import { CreateUserUseCaseImpl } from '../../../data/useCases/User/CreateUserUseCaseImpl'
import { badRequest, ok, serverError } from '../../helpers/http-helper'
import { HttpRequest, HttpResponse } from '../../protocols/http'

export class CreateUserController {
  constructor (
    private readonly createUserUseCase: CreateUserUseCaseImpl
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { name, avatar, email, password } = httpRequest.body

    try {
      const user = await this.createUserUseCase.execute({ name, avatar, email, password })

      return ok(user)
    } catch (error) {
      if (error.message === 'User already exists') {
        return badRequest(error)
      }

      return serverError(error)
    }
  }
}
