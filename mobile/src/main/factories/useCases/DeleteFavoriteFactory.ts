import { FavoriteRepositoryImpl } from '../../../data/repositories/FavoriteRepositoryImpl'
import { DeleteFavoriteUseCaseImpl } from '../../../data/useCases/DeleteFavoriteUseCaseImpl'
import { AxiosHttpClient } from '../../../infra/http/AxiosHttpClient'

export function makeDeleteFavorite() {
  const axiosHttpClient = new AxiosHttpClient()

  const favoriteRepository = new FavoriteRepositoryImpl(axiosHttpClient)

  return new DeleteFavoriteUseCaseImpl(favoriteRepository)
}
