import { UpdatePlaylistController } from '../../../../presentation/controllers/Playlists/UpdatePlaylistController'
import { PlaylistRepositoryImpl } from '../../../../infra/repositories/PlaylistRepositoryImpl'
import { UpdatePlaylistUseCaseImpl } from '../../../../data/useCases/Playlists/UpdatePlaylistUseCaseImpl'

export function makeUpdatePlaylistControllerFactory (): UpdatePlaylistController {
  const playlistRepository = new PlaylistRepositoryImpl()

  const updatePlaylistUseCase = new UpdatePlaylistUseCaseImpl(playlistRepository)

  const updatePlaylistController = new UpdatePlaylistController(updatePlaylistUseCase)

  return updatePlaylistController
}
