import { IUserRepository } from '../../data/repositories/IUserRepository'
import { forbidden, ok, serverError } from '../helpers/http-helper'
import { HttpRequest, HttpResponse } from '../protocols/http'
import { Middleware } from '../protocols/middleware'

export class AuthMiddleware implements Middleware {
  constructor (
    private readonly userRepository: IUserRepository
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { authorization } = httpRequest.headers

    const token = authorization.replace('Bearer', '').trim()

    try {
      const user = await this.userRepository.loadUserByToken(token)

      if (user) {
        return ok({ userId: user.id })
      } else {
        return forbidden(new Error('Invalid token'))
      }
    } catch (error) {
      return serverError(error)
    }
  }
}
