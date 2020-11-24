import { Favorite } from '../entities/Favorite'

export interface ILoadFavoritesUseCase {
  execute: () => Promise<Favorite[]>
}
