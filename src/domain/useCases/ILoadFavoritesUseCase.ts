import { Music } from '../entities/Music'

export interface ILoadFavoritesUseCase {
  execute: () => Promise<Music[]>
}
