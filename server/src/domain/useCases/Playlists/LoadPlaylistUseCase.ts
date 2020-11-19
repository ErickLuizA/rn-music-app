import { MusicModel } from '../../models/Music'

export interface LoadPlaylistUseCase {
  execute: (playlistId: string) => Promise<MusicModel[]>
}
