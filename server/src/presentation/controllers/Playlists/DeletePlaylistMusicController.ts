import { DeletePlaylistMusicUseCase } from '../../../domain/useCases/Playlists/DeletePlaylistMusicUseCase'
import { ok, serverError } from '../../helpers/http-helper'
import { HttpRequest, HttpResponse } from '../../protocols/http'

export class DeletePlaylistMusicController {
  constructor (
    private readonly deletePlaylistMusicUseCase: DeletePlaylistMusicUseCase
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { playlistId, playlistMusicId } = httpRequest.body

    try {
      const result = await this.deletePlaylistMusicUseCase.execute(playlistId, playlistMusicId)

      return ok(result)
    } catch (error) {
      return serverError(error)
    }
  }
}
