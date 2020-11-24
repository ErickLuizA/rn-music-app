import { PlaylistRepositoryImpl } from '../../../data/repositories/PlaylistsRepositoryImpl'
import { LoadPlaylistMusicsUseCaseImpl } from '../../../data/useCases/LoadPlaylistMusicsUseCaseImpl'
import { AxiosHttpClient } from '../../../infra/http/AxiosHttpClient'

export function makeLoadPlaylistMusics() {
  const axiosHttpClient = new AxiosHttpClient()

  const playlistRepository = new PlaylistRepositoryImpl(axiosHttpClient)

  return new LoadPlaylistMusicsUseCaseImpl(playlistRepository)
}
