import { DeletePlaylistMusicUseCase } from '../../../domain/useCases/Playlists/DeletePlaylistMusicUseCase'
import { IPlaylistRepository } from '../../repositories/IPlaylistRepository'

export class DeletePlaylistMusicUseCaseImpl implements DeletePlaylistMusicUseCase {
  constructor (
    private readonly playlistRepository: IPlaylistRepository
  ) {}

  async execute (playlistId: string, playlistMusicId: string): Promise<number> {
    return await this.playlistRepository.deleteMusic(playlistId, playlistMusicId)
  }
}
