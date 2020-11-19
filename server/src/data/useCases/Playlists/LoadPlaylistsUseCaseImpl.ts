import { PlaylistModel } from '../../../domain/models/Playlist'
import { LoadPlaylistsUseCase } from '../../../domain/useCases/Playlists/LoadPlaylistsUseCase'
import { IPlaylistRepository } from '../../repositories/IPlaylistRepository'

export class LoadPlaylistsUseCaseImpl implements LoadPlaylistsUseCase {
  constructor (
    private readonly playlistRepository: IPlaylistRepository
  ) {}

  async execute (userId: string): Promise<PlaylistModel[]> {
    return await this.playlistRepository.loadAll(userId)
  }
}
