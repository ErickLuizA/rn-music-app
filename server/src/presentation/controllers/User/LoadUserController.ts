import { LoadUserUseCase } from '../../../domain/useCases/User/LoadUserUseCase'
import { HttpRequest, HttpResponse } from '../../protocols/http'
import { ok, serverError } from '../../helpers/http-helper'

export class LoadUserController {
  constructor (
    private readonly loadUserUseCase: LoadUserUseCase
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const id = httpRequest.userId

    try {
      const user = await this.loadUserUseCase.byId(id ?? '')

      return ok(user)
    } catch (error) {
      return serverError(error)
    }
  }
}
