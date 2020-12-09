import { Playlist } from '../entities/Playlist'

export type UpdatePlaylistParams = Playlist

export interface IUpdatePlaylistUseCase {
  execute: (params: UpdatePlaylistParams) => Promise<void>
}
