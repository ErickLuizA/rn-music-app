import { MusicModel } from '../../models/Music'

export interface CreatePlaylistMusicUseCase {
  execute: (musicId: string, title: string, img: string, playlistId: string) => Promise<MusicModel>
}
