import { CreatePlaylistUseCase } from '../../../domain/useCases/Playlists/CreatePlaylistUseCase'
import { ok, serverError } from '../../helpers/http-helper'
import { HttpRequest, HttpResponse } from '../../protocols/http'

export class CreatePlaylistController {
  constructor (
    private readonly createPlaylistUseCase: CreatePlaylistUseCase
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const userId = httpRequest.userId
    const { title } = httpRequest.body

    const data = { userId: userId ?? '', title }

    try {
      const result = await this.createPlaylistUseCase.execute(data)

      return ok(result)
    } catch (error) {
      return serverError(error)
    }
  }
}
