import { LoadAudioUseCase } from '../../../domain/useCases/Audio/LoadAudioUseCase'
import { ok, serverError } from '../../helpers/http-helper'
import { HttpRequest, HttpResponse } from '../../protocols/http'

export class LoadAudioController<T> {
  constructor (
    private readonly loadAudioUseCase: LoadAudioUseCase<T>
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { id } = httpRequest.params

    try {
      const res = await this.loadAudioUseCase.execute(id)

      return ok(res)
    } catch (error) {
      return serverError(error)
    }
  }
}
