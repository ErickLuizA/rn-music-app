import { LoadPlaylistUseCase } from '../../../domain/useCases/Playlists/LoadPlaylistUseCase'
import { ok, serverError } from '../../helpers/http-helper'
import { HttpRequest, HttpResponse } from '../../protocols/http'

export class LoadPlaylistController {
  constructor (
    private readonly loadPlaylistUseCase: LoadPlaylistUseCase
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { id } = httpRequest.params

    try {
      const result = await this.loadPlaylistUseCase.execute(id)

      return ok(result)
    } catch (error) {
      return serverError(error)
    }
  }
}
