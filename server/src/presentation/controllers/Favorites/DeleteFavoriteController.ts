import { DeleteFavoriteUseCase } from '../../../domain/useCases/Favorites/DeleteFavoriteUseCase'

import { ok, serverError } from '../../helpers/http-helper'
import { HttpRequest, HttpResponse } from '../../protocols/http'

export class DeleteFavoriteController {
  constructor(private readonly deleteFavoritesUseCase: DeleteFavoriteUseCase) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const userId = httpRequest.userId
    const { id } = httpRequest.params

    try {
      const favorites = await this.deleteFavoritesUseCase.execute(id, userId!)

      return ok(favorites)
    } catch (error) {
      return serverError(error)
    }
  }
}
