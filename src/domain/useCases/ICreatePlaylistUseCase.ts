import { Playlist } from '../entities/Playlist'

export type CreatePlaylistParams = Omit<Playlist, 'playlistId'>

export interface ICreatePlaylistUseCase {
  execute: (params: CreatePlaylistParams) => Promise<void>
}
