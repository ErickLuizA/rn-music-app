import { DeletePlaylistUseCaseImpl } from '../../../../data/useCases/Playlists/DeletePlaylistUseCaseImpl'
import { PlaylistRepositoryImpl } from '../../../../infra/repositories/PlaylistRepositoryImpl'
import { DeletePlaylistController } from '../../../../presentation/controllers/Playlists/DeletePlaylistController'

export function makeDeletePlaylistControllerFactory (): DeletePlaylistController {
  const playlistRepository = new PlaylistRepositoryImpl()

  const deletePlaylistUseCase = new DeletePlaylistUseCaseImpl(playlistRepository)

  const deletePlaylistController = new DeletePlaylistController(deletePlaylistUseCase)

  return deletePlaylistController
}
