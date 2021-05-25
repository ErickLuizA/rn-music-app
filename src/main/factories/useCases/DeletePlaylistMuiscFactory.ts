import { PlaylistRepositoryImpl } from '../../../data/repositories/PlaylistsRepositoryImpl'
import { DeletePlaylistMusicUseCaseImpl } from '../../../data/useCases/DeletePlaylistMusicUseCaseImpl'
import { AxiosHttpClient } from '../../../infra/http/AxiosHttpClient'

export function makeDeletePlaylistMusic() {
  const axiosHttpClient = new AxiosHttpClient()

  const playlistRepository = new PlaylistRepositoryImpl(axiosHttpClient)

  return new DeletePlaylistMusicUseCaseImpl(playlistRepository)
}
