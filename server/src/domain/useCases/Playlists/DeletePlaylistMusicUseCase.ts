export interface DeletePlaylistMusicUseCase {
  execute: (userId: string, playlistId: string, musicId: string) => Promise<number>
}
