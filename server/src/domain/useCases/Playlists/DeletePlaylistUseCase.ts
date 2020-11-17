export interface deletePlaylistUseCase {
  execute: (userId: number, playlistId: number) => Promise<void>
}
