import { FavoriteMusicModel } from '../../models/FavoriteMusic'

export interface LoadFavoritesUseCase {
  execute: (userId: string) => Promise<FavoriteMusicModel[]>
}
