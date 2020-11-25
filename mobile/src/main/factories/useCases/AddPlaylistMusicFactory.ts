import { PlaylistRepositoryImpl } from '../../../data/repositories/PlaylistsRepositoryImpl'
import { AddPlaylistMusicUseCaseImpl } from '../../../data/useCases/AddPlaylistMusicUseCaseImpl'
import { AxiosHttpClient } from '../../../infra/http/AxiosHttpClient'

export function makeAddPlaylistMusic() {
  const httpClient = new AxiosHttpClient()

  const playlistRepository = new PlaylistRepositoryImpl(httpClient)

  return new AddPlaylistMusicUseCaseImpl(playlistRepository)
}
