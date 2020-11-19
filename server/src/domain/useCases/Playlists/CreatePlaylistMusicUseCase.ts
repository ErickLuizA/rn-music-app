import { MusicModel } from '../../models/Music'

export interface CreatePlaylistMusicUseCase {
  execute: (userId: string, musicId: string, title: string, img: string, playlistId: string) => Promise<MusicModel>
}
