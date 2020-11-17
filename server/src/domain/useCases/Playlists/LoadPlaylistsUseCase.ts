import { PlaylistModel } from '../../models/Playlist'

export interface LoadPlaylistsUseCase {
  execute: (userId: number) => Promise<PlaylistModel[]>
}
