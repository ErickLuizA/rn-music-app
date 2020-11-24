import { IPlaylistRepository } from '../../domain/repositories/IPlaylistsRepository'
import {
  IUpdatePlaylistUseCase,
  UpdatePlaylistParams,
} from '../../domain/useCases/IUpdatePlaylistUseCase'

export class UpdatePlaylistUseCaseImpl implements IUpdatePlaylistUseCase {
  constructor(private readonly playlistRepository: IPlaylistRepository) {}

  async execute(params: UpdatePlaylistParams): Promise<void> {
    return await this.playlistRepository.update(params)
  }
}
