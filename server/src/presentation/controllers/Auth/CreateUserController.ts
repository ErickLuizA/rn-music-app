import { CreateUserUseCaseImpl } from '../../../data/useCases/User/CreateUserUseCaseImpl'
import { badRequest, badRequests, ok, serverError } from '../../helpers/http-helper'
import { HttpRequest, HttpResponse } from '../../protocols/http'
import { Validation } from '../../protocols/validation'

export class CreateUserController {
  constructor (
    private readonly createUserUseCase: CreateUserUseCaseImpl,
    private readonly validator: Validation
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { name, avatar, email, password } = httpRequest.body

    const error = this.validator.validate(httpRequest.body)

    if (error.length > 0) {
      if (error.length > 1) {
        return badRequests(error)
      }
      return badRequest(error[0])
    }

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
