import { UpdatePlaylistUseCase } from '../../../domain/useCases/Playlists/UpdatePlaylistUseCase'
import { ok, serverError } from '../../helpers/http-helper'
import { HttpRequest, HttpResponse } from '../../protocols/http'

export class UpdatePlaylistController {
  constructor(private readonly updatePlaylistUseCase: UpdatePlaylistUseCase) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const userId = httpRequest.userId
    const {
      data: { playlistId, title },
    } = httpRequest.body

    const data = { userId: userId ?? '', playlistId, title }

    try {
      const result = await this.updatePlaylistUseCase.execute(data)

      return ok(result)
    } catch (error) {
      return serverError(error)
    }
  }
}
