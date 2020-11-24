import { Favorite } from '../../domain/entities/Favorite'
import { IFavoriteRepository } from '../../domain/repositories/IFavoritesRepository'
import { CreateFavoritesParams } from '../../domain/useCases/ICreateFavoriteUseCase'
import { DeleteFavoritesParams } from '../../domain/useCases/IDeleteFavoriteUseCase'
import { IHttpClient } from '../protocols/IHttpClient'

export class FavoriteRepositoryImpl implements IFavoriteRepository {
  constructor(private readonly httpClient: IHttpClient) {}

  async create(params: CreateFavoritesParams): Promise<void> {
    return await this.httpClient.post('/favorite', params)
  }

  async load(): Promise<Favorite[]> {
    return await this.httpClient.get('/favorites')
  }

  async delete(params: DeleteFavoritesParams): Promise<void> {
    return await this.httpClient.delete(`/favorite/${params.id}`)
  }
}
