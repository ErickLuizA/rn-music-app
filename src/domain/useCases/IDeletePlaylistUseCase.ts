import { Playlist } from '../entities/Playlist'

export type DeletePlaylistParams = Omit<Playlist, 'title'>

export interface IDeletePlaylistUseCase {
  execute: (params: DeletePlaylistParams) => Promise<void>
}
