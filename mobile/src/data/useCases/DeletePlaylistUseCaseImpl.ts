import { IPlaylistRepository } from '../../domain/repositories/IPlaylistsRepository'
import {
  DeletePlaylistParams,
  IDeletePlaylistUseCase,
} from '../../domain/useCases/IDeletePlaylistUseCase'

export class DeletePlaylistUseCaseImpl implements IDeletePlaylistUseCase {
  constructor(private readonly playlistRepository: IPlaylistRepository) {}

  async execute(params: DeletePlaylistParams): Promise<void> {
    return await this.playlistRepository.delete(params)
  }
}
