import { CreatePlaylistUseCaseImpl } from '../../../../data/useCases/Playlists/CreatePlaylistUseCaseImpl'
import { PlaylistRepositoryImpl } from '../../../../infra/repositories/PlaylistRepositoryImpl'
import { CreatePlaylistController } from '../../../../presentation/controllers/Playlists/CreatePlaylistController'

export function makeCreatePlaylistControllerFactory (): CreatePlaylistController {
  const playlistRepository = new PlaylistRepositoryImpl()

  const createPlaylistUseCase = new CreatePlaylistUseCaseImpl(playlistRepository)

  const createPlaylistController = new CreatePlaylistController(createPlaylistUseCase)

  return createPlaylistController
}
