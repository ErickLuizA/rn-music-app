import { Music } from '../../domain/entities/Music'
import { IFavoriteRepository } from '../../domain/repositories/IFavoritesRepository'
import { CreateFavoritesParams } from '../../domain/useCases/ICreateFavoriteUseCase'
import { DeleteFavoritesParams } from '../../domain/useCases/IDeleteFavoriteUseCase'
import { IHttpClient } from '../protocols/IHttpClient'

export class FavoriteRepositoryImpl implements IFavoriteRepository {
  constructor(private readonly httpClient: IHttpClient) {}

  async create(params: CreateFavoritesParams): Promise<string> {
    return await this.httpClient.post('/favorite', params)
  }

  async load(): Promise<Music[]> {
    const response = await this.httpClient.get('/favorites')

    return response.map((item: any) => Music.fromFavorite(item))
  }

  async delete(params: DeleteFavoritesParams): Promise<void> {
    return await this.httpClient.delete(`/favorite/${params.id}`)
  }
}
