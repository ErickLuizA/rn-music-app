import { MusicModel } from '../../domain/models/Music'
import { PlaylistModel } from '../../domain/models/Playlist'

export interface IPlaylistRepository {
  create: (userId: string, title: string) => Promise<PlaylistModel>

  createMusic: (musicId: string, title: string, img: string, playlistId: string) => Promise<MusicModel>

  load: (userId: string, title: string) => Promise<PlaylistModel>

  loadAll: (userId: string) => Promise<PlaylistModel[]>

  loadMusic: (playlistId: string, musicId: string) => Promise<MusicModel>

  loadMusics: (playlistId: string) => Promise<MusicModel[]>

  update: (userId: string, playlistId: string, title: string) => Promise<number | undefined>

  delete: (userId: string, playlistId: string) => Promise<number>

  deleteMusic: (playlistId: string, musicId: string) => Promise<number>

}
