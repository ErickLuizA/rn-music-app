import { DeletePlaylistUseCase } from '../../../domain/useCases/Playlists/DeletePlaylistUseCase'
import { ok, serverError } from '../../helpers/http-helper'
import { HttpRequest, HttpResponse } from '../../protocols/http'

export class DeletePlaylistController {
  constructor(private readonly deletePlaylistUseCase: DeletePlaylistUseCase) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const userId = httpRequest.userId
    const { id } = httpRequest.params

    try {
      const result = await this.deletePlaylistUseCase.execute(userId ?? '', id)

      return ok(result)
    } catch (error) {
      return serverError(error)
    }
  }
}
