import { DeleteFavoriteUseCaseImpl } from '../../../../data/useCases/Favorites/DeleteFavoriteUseCaseImpl'
import { FavoriteRepositoryImpl } from '../../../../infra/repositories/FavoriteRepositoryImpl'
import { DeleteFavoriteController } from '../../../../presentation/controllers/Favorites/DeleteFavoriteController'

export function makeDeleteFavoriteControllerFactory (): DeleteFavoriteController {
  const favoriteRepository = new FavoriteRepositoryImpl()

  const deleteFavoriteUseCase = new DeleteFavoriteUseCaseImpl(favoriteRepository)

  const deleteFavoriteController = new DeleteFavoriteController(deleteFavoriteUseCase)

  return deleteFavoriteController
}
