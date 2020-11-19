import { LoadPlaylistsController } from '../../../../presentation/controllers/Playlists/LoadPlaylistsController'
import { PlaylistRepositoryImpl } from '../../../../infra/repositories/PlaylistRepositoryImpl'
import { LoadPlaylistsUseCaseImpl } from '../../../../data/useCases/Playlists/LoadPlaylistsUseCaseImpl'

export function makeLoadPlaylistsControllerFactory (): LoadPlaylistsController {
  const playlistRepository = new PlaylistRepositoryImpl()

  const loadPlaylistsUseCase = new LoadPlaylistsUseCaseImpl(playlistRepository)

  const loadPlaylistsController = new LoadPlaylistsController(loadPlaylistsUseCase)

  return loadPlaylistsController
}
