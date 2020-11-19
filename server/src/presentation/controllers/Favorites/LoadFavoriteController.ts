import { LoadFavoritesUseCase } from '../../../domain/useCases/Favorites/LoadFavoritesUseCase'
import { ok, serverError } from '../../helpers/http-helper'
import { HttpRequest, HttpResponse } from '../../protocols/http'

export class LoadFavoriteController {
  constructor (
    private readonly loadFavoritesUseCase: LoadFavoritesUseCase
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const userId = httpRequest.userId

    try {
      const favorites = await this.loadFavoritesUseCase.execute(userId!)

      return ok(favorites)
    } catch (error) {
      return serverError(error)
    }
  }
}
