import { PlaylistRepositoryImpl } from '../../../data/repositories/PlaylistsRepositoryImpl'
import { DeletePlaylistUseCaseImpl } from '../../../data/useCases/DeletePlaylistUseCaseImpl'
import { AxiosHttpClient } from '../../../infra/http/AxiosHttpClient'

export function makeDeletePlaylist() {
  const axiosHttpClient = new AxiosHttpClient()

  const playlistRepository = new PlaylistRepositoryImpl(axiosHttpClient)

  return new DeletePlaylistUseCaseImpl(playlistRepository)
}
