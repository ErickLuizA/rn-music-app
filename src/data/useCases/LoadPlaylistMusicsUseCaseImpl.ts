import { PlaylistMusic } from '../../domain/entities/Music'
import { IPlaylistRepository } from '../../domain/repositories/IPlaylistsRepository'
import {
  LoadPlaylistMusicsParams,
  ILoadPlaylistMusicUseCase,
} from '../../domain/useCases/ILoadPlaylistMusicsUseCase'

export class LoadPlaylistMusicsUseCaseImpl
  implements ILoadPlaylistMusicUseCase {
  constructor(private readonly playlistRepository: IPlaylistRepository) {}

  async execute(params: LoadPlaylistMusicsParams): Promise<PlaylistMusic[]> {
    return await this.playlistRepository.load(params)
  }
}
