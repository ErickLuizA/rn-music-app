import { IPlaylistRepository } from '../../domain/repositories/IPlaylistsRepository'
import {
  DeletePlaylistMusicParams,
  IDeletePlaylistUseCase,
} from '../../domain/useCases/IDeletePlaylistMusicUseCase'

export class DeletePlaylistMusicUseCaseImpl implements IDeletePlaylistUseCase {
  constructor(private readonly playlistRepository: IPlaylistRepository) {}

  async execute(params: DeletePlaylistMusicParams): Promise<void> {
    return await this.playlistRepository.deleteMusic(params)
  }
}
