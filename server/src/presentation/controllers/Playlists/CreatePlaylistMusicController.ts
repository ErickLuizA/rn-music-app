import { CreatePlaylistMusicUseCase } from '../../../domain/useCases/Playlists/CreatePlaylistMusicUseCase'
import { ok, serverError } from '../../helpers/http-helper'
import { HttpRequest, HttpResponse } from '../../protocols/http'

export class CreatePlaylistMusicController {
  constructor (
    private readonly createPlaylistMusicUseCase: CreatePlaylistMusicUseCase
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { musicId, title, img, playlistId } = httpRequest.body

    try {
      const result = await this.createPlaylistMusicUseCase.execute(musicId, title, img, playlistId)

      return ok(result)
    } catch (error) {
      return serverError(error)
    }
  }
}
