import { LoadPlaylistController } from '../../../../presentation/controllers/Playlists/LoadPlaylistController'
import { PlaylistRepositoryImpl } from '../../../../infra/repositories/PlaylistRepositoryImpl'
import { LoadPlaylistUseCaseImpl } from '../../../../data/useCases/Playlists/LoadPlaylistUseCaseImpl'

export function makeLoadPlaylistControllerFactory (): LoadPlaylistController {
  const playlistRepository = new PlaylistRepositoryImpl()

  const loadPlaylistUseCase = new LoadPlaylistUseCaseImpl(playlistRepository)

  const loadPlaylistController = new LoadPlaylistController(loadPlaylistUseCase)

  return loadPlaylistController
}
