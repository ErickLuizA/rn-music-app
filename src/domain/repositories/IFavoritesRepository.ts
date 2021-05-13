import { Music } from '../entities/Music'
import { CreateFavoritesParams } from '../useCases/ICreateFavoriteUseCase'
import { DeleteFavoritesParams } from '../useCases/IDeleteFavoriteUseCase'

export interface IFavoriteRepository {
  create: (params: CreateFavoritesParams) => Promise<string>

  load: () => Promise<Music[]>

  delete: (params: DeleteFavoritesParams) => Promise<void>
}
