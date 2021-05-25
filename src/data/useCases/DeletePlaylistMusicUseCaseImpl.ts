import { IPlaylistRepository } from '../../domain/repositories/IPlaylistsRepository'
import {
  DeletePlaylistMusicParams,
  IDeletePlaylistMusicUseCase,
} from '../../domain/useCases/IDeletePlaylistMusicUseCase'

export class DeletePlaylistMusicUseCaseImpl
  implements IDeletePlaylistMusicUseCase
{
  constructor(private readonly playlistRepository: IPlaylistRepository) {}

  async execute(params: DeletePlaylistMusicParams): Promise<void> {
    return await this.playlistRepository.deleteMusic(params)
  }
}
