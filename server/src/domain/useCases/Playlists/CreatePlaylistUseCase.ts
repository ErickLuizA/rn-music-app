import { PlaylistModel } from '../../models/Playlist'

export type CreatePlaylistParams = Omit<PlaylistModel, 'playlistId'>

export interface CreatePlaylistUseCase {
  execute: (createPlaylistParams: CreatePlaylistParams) => Promise<PlaylistModel>
}
