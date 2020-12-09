export interface AddPlaylistParams {
  musicId: string
  title: string
  img: string
  playlistId: string
}

export interface IAddPlaylistUseCase {
  execute: (params: AddPlaylistParams) => Promise<void>
}
