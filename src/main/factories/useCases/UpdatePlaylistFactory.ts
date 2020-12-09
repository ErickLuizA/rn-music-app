import { PlaylistRepositoryImpl } from '../../../data/repositories/PlaylistsRepositoryImpl'
import { UpdatePlaylistUseCaseImpl } from '../../../data/useCases/UpdatePlaylistUseCaseImpl'
import { IUpdatePlaylistUseCase } from '../../../domain/useCases/IUpdatePlaylistUseCase'
import { AxiosHttpClient } from '../../../infra/http/AxiosHttpClient'

export function makeUpdatePlaylsit(): IUpdatePlaylistUseCase {
  const httpClient = new AxiosHttpClient()

  const playlistRepository = new PlaylistRepositoryImpl(httpClient)

  return new UpdatePlaylistUseCaseImpl(playlistRepository)
}
