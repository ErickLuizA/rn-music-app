import { LoadFavoritesUseCaseImpl } from '../../../../data/useCases/Favorites/LoadFavoritesUseCaseImpl'
import { FavoriteRepositoryImpl } from '../../../../infra/repositories/FavoriteRepositoryImpl'
import { LoadFavoriteController } from '../../../../presentation/controllers/Favorites/LoadFavoriteController'

export function makeLoadFavoriteControllerFactory (): LoadFavoriteController {
  const favoriteRepository = new FavoriteRepositoryImpl()

  const loadFavoriteUseCase = new LoadFavoritesUseCaseImpl(favoriteRepository)

  const loadFavoriteController = new LoadFavoriteController(loadFavoriteUseCase)

  return loadFavoriteController
}
