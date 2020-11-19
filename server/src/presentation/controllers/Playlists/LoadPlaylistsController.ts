import { LoadPlaylistsUseCase } from '../../../domain/useCases/Playlists/LoadPlaylistsUseCase'
import { ok, serverError } from '../../helpers/http-helper'
import { HttpRequest, HttpResponse } from '../../protocols/http'

export class LoadPlaylistsController {
  constructor (
    private readonly loadPlaylistsUseCase: LoadPlaylistsUseCase
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const userId = httpRequest.userId

    try {
      const result = await this.loadPlaylistsUseCase.execute(userId ?? '')

      return ok(result)
    } catch (error) {
      return serverError(error)
    }
  }
}
