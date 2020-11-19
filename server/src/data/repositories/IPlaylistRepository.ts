import { MusicModel } from '../../domain/models/Music'
import { PlaylistModel } from '../../domain/models/Playlist'

export interface IPlaylistRepository {
  create: (userId: string, title: string) => Promise<PlaylistModel>

  createMusic: (userId: string, musicId: string, title: string, img: string, playlistId: string) => Promise<MusicModel>

  load: (userId: string, title: string) => Promise<PlaylistModel>

  loadAll: (userId: string) => Promise<PlaylistModel[]>

  loadMusic: (userId: string, playlistId: string, musicId: string) => Promise<MusicModel>

  loadMusics: (userId: string, playlistId: string) => Promise<MusicModel[]>

  update: (userId: string, playlistId: string, title: string) => Promise<PlaylistModel>

  delete: (userId: string, playlistId: string) => Promise<number>

  deleteMusic: (userId: string, playlistId: string, musicId: string) => Promise<number>

}
