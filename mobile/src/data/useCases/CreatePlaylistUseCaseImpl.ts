import { IPlaylistRepository } from '../../domain/repositories/IPlaylistsRepository'
import {
  CreatePlaylistParams,
  ICreatePlaylistUseCase,
} from '../../domain/useCases/ICreatePlaylistUseCase'

export class CreatePlaylistUseCaseImpl implements ICreatePlaylistUseCase {
  constructor(private readonly playlistRepository: IPlaylistRepository) {}

  async execute(params: CreatePlaylistParams): Promise<void> {
    return await this.playlistRepository.create(params)
  }
}
