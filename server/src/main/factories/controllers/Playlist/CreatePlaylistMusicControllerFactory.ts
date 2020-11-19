import { CreatePlaylistMusicUseCaseImpl } from "../../../../data/useCases/Playlists/CreatePlaylistMusicUseCaseImpl"
import { PlaylistRepositoryImpl } from "../../../../infra/repositories/PlaylistRepositoryImpl"
import { CreatePlaylistMusicController } from "../../../../presentation/controllers/Playlists/CreatePlaylistMusicController"

export function makeCreatePlaylistMusicControllerFactory (): CreatePlaylistMusicController {
  const playlistRepository = new PlaylistRepositoryImpl()

  const createPlaylistMusicUseCase = new CreatePlaylistMusicUseCaseImpl(playlistRepository)

  const createPlaylistMusicController = new CreatePlaylistMusicController(createPlaylistMusicUseCase)

  return createPlaylistMusicController
}
