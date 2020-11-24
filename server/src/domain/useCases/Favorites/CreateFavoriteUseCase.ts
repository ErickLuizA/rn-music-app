import { FavoriteMusicModel } from '../../models/FavoriteMusic'

export type CreateFavoriteParams = Omit<FavoriteMusicModel, 'favoriteId'>

export interface CreateFavoriteUseCase {
  execute: (createFavoriteParams: CreateFavoriteParams) => Promise<FavoriteMusicModel>
}
