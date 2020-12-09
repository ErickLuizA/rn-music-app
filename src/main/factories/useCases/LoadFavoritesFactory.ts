import { FavoriteRepositoryImpl } from '../../../data/repositories/FavoriteRepositoryImpl'
import { LoadFavoriteUseCaseImpl } from '../../../data/useCases/LoadFavoritesUseCaseImpl'
import { ILoadFavoritesUseCase } from '../../../domain/useCases/ILoadFavoritesUseCase'
import { AxiosHttpClient } from '../../../infra/http/AxiosHttpClient'

export function makeLoadFavorites(): ILoadFavoritesUseCase {
  const axiosHttpClient = new AxiosHttpClient()

  const favoriteRepository = new FavoriteRepositoryImpl(axiosHttpClient)

  return new LoadFavoriteUseCaseImpl(favoriteRepository)
}
