import { MusicModel } from '../../../domain/models/Music'
import { LoadPlaylistUseCase } from '../../../domain/useCases/Playlists/LoadPlaylistUseCase'
import { IPlaylistRepository } from '../../repositories/IPlaylistRepository'

export class LoadPlaylistUseCaseImpl implements LoadPlaylistUseCase {
  constructor (
    private readonly playlistRepository: IPlaylistRepository
  ) {}

  async execute (userId: string, playlistId: string): Promise<MusicModel[]> {
    return await this.playlistRepository.loadMusics(userId, playlistId)
  }
}
