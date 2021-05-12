import { Music } from '../../domain/entities/Music'
import { IMusicRepository } from '../../domain/repositories/IMusicRepository'
import { LoadMusicsParams } from '../../domain/useCases/ILoadMusicsUseCause'
import { IHttpClient } from '../protocols/IHttpClient'

interface searchQuery {
  q: string
  part: string
  maxResults: number
  key: string
}

interface YoutubeResponse {
  items: any[]
}

export class MusicRepositoryImpl implements IMusicRepository {
  constructor(private readonly httpClient: IHttpClient) {}

  async load(params: LoadMusicsParams): Promise<Music[]> {
    const response: YoutubeResponse = await this.httpClient.get(
      '/videos',
      null,
      params,
    )

    return response.items.map(item => Music.fromJson(item))
  }

  async search(query: searchQuery): Promise<Music[]> {
    return await this.httpClient.get('/search', null, query)
  }
}
