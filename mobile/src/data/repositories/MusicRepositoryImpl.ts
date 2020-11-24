import { IMusicRepository } from '../../domain/repositories/IMusicRepository'
import {
  LoadMusicsParams,
  MusicResponse,
} from '../../domain/useCases/ILoadMusicsUseCause'
import { IHttpClient } from '../protocols/IHttpClient'

export class MusicRepositoryImpl implements IMusicRepository {
  constructor(private readonly httpClient: IHttpClient) {}
  async load(params: LoadMusicsParams): Promise<MusicResponse> {
    return await this.httpClient.get('/videos', null, params)
  }
}
