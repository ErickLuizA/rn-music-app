import { MusicModel } from '../../models/Music'

export interface LoadPlaylistUseCase {
  execute: (userId: string, playlistId: string) => Promise<MusicModel[]>
}
