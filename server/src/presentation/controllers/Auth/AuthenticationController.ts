import { AuthenticationUseCase } from '../../../domain/useCases/User/AuthenticationUseCase'
import { Validator } from '../../../validation/Validator'
import { badRequest, badRequests, forbidden, ok, serverError } from '../../helpers/http-helper'
import { HttpRequest, HttpResponse } from '../../protocols/http'

export class AuthenticationController {
  constructor (
    private readonly validator: Validator,
    private readonly authenticationUseCase: AuthenticationUseCase
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { email, password } = httpRequest.body

    const data = {
      email,
      password
    }

    const error = this.validator.validate(data)

    if (error.length > 0) {
      if (error.length > 1) {
        return badRequests(error)
      }
      return badRequest(error[0])
    }

    try {
      const res = await this.authenticationUseCase.execute(data)

      return ok(res)
    } catch (error) {
      if (error.message === 'Invalid credentials') {
        return forbidden(error)
      }
      return serverError(error)
    }
  }
}
