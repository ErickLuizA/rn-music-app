import { FavoriteMusicModel } from '../../models/FavoriteMusic'

export interface LoadFavoritesUseCase {
  execute: (userId: number) => Promise<FavoriteMusicModel>
}
