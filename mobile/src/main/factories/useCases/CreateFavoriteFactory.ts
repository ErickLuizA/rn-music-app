import { FavoriteRepositoryImpl } from '../../../data/repositories/FavoriteRepositoryImpl'
import { CreateFavoriteUseCaseImpl } from '../../../data/useCases/CreateFavoriteUseCaseImpl'
import { AxiosHttpClient } from '../../../infra/http/AxiosHttpClient'

export function makeCreateFavorite() {
  const httpClient = new AxiosHttpClient()

  const favoriteRepository = new FavoriteRepositoryImpl(httpClient)

  return new CreateFavoriteUseCaseImpl(favoriteRepository)
}
