export interface DeletePlaylistMusicParams {
  playlistId: string
  musicId: string
}

export interface IDeletePlaylistUseCase {
  execute: (params: DeletePlaylistMusicParams) => Promise<void>
}
