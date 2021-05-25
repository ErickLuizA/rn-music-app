export interface DeletePlaylistMusicParams {
  playlistId: string
  musicId: string
}

export interface IDeletePlaylistMusicUseCase {
  execute: (params: DeletePlaylistMusicParams) => Promise<void>
}
