import { PlaylistRepositoryImpl } from '../../../data/repositories/PlaylistsRepositoryImpl'
import { CreatePlaylistUseCaseImpl } from '../../../data/useCases/CreatePlaylistUseCaseImpl'
import { AxiosHttpClient } from '../../../infra/http/AxiosHttpClient'

export function makeCreatePlaylist() {
  const httpClient = new AxiosHttpClient()

  const playlistRepository = new PlaylistRepositoryImpl(httpClient)

  return new CreatePlaylistUseCaseImpl(playlistRepository)
}
