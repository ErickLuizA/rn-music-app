export interface DeletePlaylistUseCase {
  execute: (userId: string, playlistId: string) => Promise<number>
}
