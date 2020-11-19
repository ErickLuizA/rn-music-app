export interface DeletePlaylistMusicUseCase {
  execute: (playlistId: string, playlistMusicId: string) => Promise<number>
}
