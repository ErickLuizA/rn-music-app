import { Playlist } from '../entities/Playlist'

export interface ILoadPlaylistsUseCase {
  execute: () => Promise<Playlist[]>
}
