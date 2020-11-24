import { IPlaylistRepository } from '../../domain/repositories/IPlaylistsRepository'
import {
  AddPlaylistParams,
  IAddPlaylistUseCase,
} from '../../domain/useCases/IAddPlaylistMusicUseCase'

export class AddPlaylistMusicUseCaseImpl implements IAddPlaylistUseCase {
  constructor(private readonly playlistRepository: IPlaylistRepository) {}

  async execute(params: AddPlaylistParams): Promise<void> {
    return await this.playlistRepository.add(params)
  }
}
