import { CreateFavoriteUseCaseImpl } from '../../../../data/useCases/Favorites/CreateFavoriteUseCaseImpl'
import { FavoriteRepositoryImpl } from '../../../../infra/repositories/FavoriteRepositoryImpl'
import { CreateFavoriteController } from '../../../../presentation/controllers/Favorites/CreateFavoriteController'

export function makeCreateFavoriteControllerFactory (): CreateFavoriteController {
  const favoriteRepository = new FavoriteRepositoryImpl()

  const createFavoriteUseCase = new CreateFavoriteUseCaseImpl(favoriteRepository)

  const createFavoriteController = new CreateFavoriteController(createFavoriteUseCase)

  return createFavoriteController
}
