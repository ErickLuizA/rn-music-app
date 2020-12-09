import { Playlist } from '../../domain/entities/Playlist'
import { IPlaylistRepository } from '../../domain/repositories/IPlaylistsRepository'
import { ILoadPlaylistsUseCase } from '../../domain/useCases/ILoadPlaylistsUseCase'

export class LoadPlaylistsUseCaseImpl implements ILoadPlaylistsUseCase {
  constructor(private readonly playlistRepository: IPlaylistRepository) {}

  async execute(): Promise<Playlist[]> {
    return await this.playlistRepository.loadAll()
  }
}
