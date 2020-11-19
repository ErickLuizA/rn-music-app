import { DeletePlaylistUseCase } from '../../../domain/useCases/Playlists/DeletePlaylistUseCase'
import { IPlaylistRepository } from '../../repositories/IPlaylistRepository'

export class DeletePlaylistUseCaseImpl implements DeletePlaylistUseCase {
  constructor (
    private readonly playlistRepository: IPlaylistRepository
  ) {}

  async execute (userId: string, playlistId: string): Promise<number> {
    return await this.playlistRepository.delete(userId, playlistId)
  }
}
