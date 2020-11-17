import { PlaylistModel } from '../../models/Playlist'

export type UpdatePlaylistParams = PlaylistModel

export interface UpdatePlaylistUseCase {
  execute: (updatePlaylistParams: UpdatePlaylistParams) => Promise<PlaylistModel>
}
