import { PlaylistMusic } from '../entities/Music'

export interface LoadPlaylistMusicsParams {
  playlistId: string
}

export interface ILoadPlaylistMusicUseCase {
  execute: (params: LoadPlaylistMusicsParams) => Promise<PlaylistMusic[]>
}
