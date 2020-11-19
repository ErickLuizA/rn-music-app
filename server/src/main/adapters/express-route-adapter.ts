import { Response } from 'express'
import { Controller } from '../../presentation/protocols/controller'
import { HttpRequest } from '../../presentation/protocols/http'

export function adaptRoute (controller: Controller) {
  return async (request: any, response: Response) => {
    const httpRequest: HttpRequest = {
      body: request.body,
      params: request.params,
      userId: request.userId
    }

    const httpResponse = await controller.handle(httpRequest)

    response.status(httpResponse.statusCode).json(httpResponse.body)
  }
}
