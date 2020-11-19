import { FavoriteMusicModel } from '../../domain/models/FavoriteMusic'
import { CreateFavoriteParams } from '../../domain/useCases/Favorites/CreateFavoriteUseCase'

export interface IFavoriteRepository {
  create: (createFavoriteParams: CreateFavoriteParams) => Promise<FavoriteMusicModel>

  load: (userId: string, musicId: string) => Promise<FavoriteMusicModel>

  loadAll: (userId: string) => Promise<FavoriteMusicModel[]>

  delete: (favoriteId: string, userId: string) => Promise<number>
}
