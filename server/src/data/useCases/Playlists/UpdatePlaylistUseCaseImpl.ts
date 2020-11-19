import { PlaylistModel } from '../../../domain/models/Playlist'
import { UpdatePlaylistUseCase } from '../../../domain/useCases/Playlists/UpdatePlaylistUseCase'
import { IPlaylistRepository } from '../../repositories/IPlaylistRepository'

export class UpdatePlaylistUseCaseImpl implements UpdatePlaylistUseCase {
  constructor (
    private readonly playlistRepository: IPlaylistRepository
  ) {}

  async execute (updatePlaylistParams: PlaylistModel): Promise<number | undefined> {
    return await this.playlistRepository.update(updatePlaylistParams.userId, updatePlaylistParams.playlistId, updatePlaylistParams.title)
  }
}
