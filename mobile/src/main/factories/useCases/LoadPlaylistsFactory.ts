import { PlaylistRepositoryImpl } from '../../../data/repositories/PlaylistsRepositoryImpl'
import { LoadPlaylistsUseCaseImpl } from '../../../data/useCases/LoadPlaylistsUseCaseImpl'
import { AxiosHttpClient } from '../../../infra/http/AxiosHttpClient'

export function makeLoadPlaylists() {
  const axiosHttpClient = new AxiosHttpClient()

  const playlistRepository = new PlaylistRepositoryImpl(axiosHttpClient)

  return new LoadPlaylistsUseCaseImpl(playlistRepository)
}
