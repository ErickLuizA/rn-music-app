import { FavoriteMusicModel } from '../../models/FavoriteMusic'

export type CreateFavoriteParams = FavoriteMusicModel

export interface CreateFavoriteUseCase {
  execute: (createFavoriteParams: CreateFavoriteParams) => Promise<FavoriteMusicModel>
}
