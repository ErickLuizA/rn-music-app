import { Favorite } from '../entities/Favorite'
import { CreateFavoritesParams } from '../useCases/ICreateFavoriteUseCase'
import { DeleteFavoritesParams } from '../useCases/IDeleteFavoriteUseCase'

export interface IFavoriteRepository {
  create: (params: CreateFavoritesParams) => Promise<string>

  load: () => Promise<Favorite[]>

  delete: (params: DeleteFavoritesParams) => Promise<void>
}
