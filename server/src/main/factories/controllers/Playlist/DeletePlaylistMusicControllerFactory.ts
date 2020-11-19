
import { DeletePlaylistMusicUseCaseImpl } from '../../../../data/useCases/Playlists/DeletePlaylistMusicUseCaseImpl'
import { PlaylistRepositoryImpl } from '../../../../infra/repositories/PlaylistRepositoryImpl'
import { DeletePlaylistMusicController } from '../../../../presentation/controllers/Playlists/DeletePlaylistMusicController'

export function makeDeletePlaylistMusicControllerFactory (): DeletePlaylistMusicController {
  const playlistMusicRepository = new PlaylistRepositoryImpl()

  const deletePlaylistMusicUseCase = new DeletePlaylistMusicUseCaseImpl(playlistMusicRepository)

  const deletePlaylistMusicController = new DeletePlaylistMusicController(deletePlaylistMusicUseCase)

  return deletePlaylistMusicController
}
