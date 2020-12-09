import { IMusicRepository } from '../../domain/repositories/IMusicRepository'
import {
  LoadMusicsParams,
  MusicResponse,
} from '../../domain/useCases/ILoadMusicsUseCause'
import { SearchedMusicResponse } from '../../domain/useCases/ISearchMusicsUseCase'
import { IHttpClient } from '../protocols/IHttpClient'

interface searchQuery {
  q: string
  part: string
  maxResults: number
  key: string
}

export class MusicRepositoryImpl implements IMusicRepository {
  constructor(private readonly httpClient: IHttpClient) {}

  async load(params: LoadMusicsParams): Promise<MusicResponse> {
    return await this.httpClient.get('/videos', null, params)
  }

  async search(query: searchQuery): Promise<SearchedMusicResponse> {
    return await this.httpClient.get('/search', null, query)
  }
}
