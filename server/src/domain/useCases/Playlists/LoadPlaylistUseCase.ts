import { MusicModel } from '../../models/Music'

export interface LoadPlaylistUseCase {
  execute: (userId: number, playlistId: number) => Promise<MusicModel[]>
}
