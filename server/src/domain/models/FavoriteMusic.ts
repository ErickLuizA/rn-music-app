import { MusicModel } from './Music'

export interface FavoriteMusicModel {
  userId: number
  favoriteId: number
  music: MusicModel
}
