import { MusicModel } from './Music'

export interface FavoriteMusicModel {
  userId: string
  favoriteId: string
  music: MusicModel
}
