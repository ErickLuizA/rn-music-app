import { PlaylistModel } from '../../models/Playlist'

export interface LoadPlaylistsUseCase {
  execute: (userId: string) => Promise<PlaylistModel[]>
}
