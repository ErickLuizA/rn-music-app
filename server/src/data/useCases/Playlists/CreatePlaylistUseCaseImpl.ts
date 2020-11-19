import { PlaylistModel } from '../../../domain/models/Playlist'
import { CreatePlaylistUseCase } from '../../../domain/useCases/Playlists/CreatePlaylistUseCase'
import { IPlaylistRepository } from '../../repositories/IPlaylistRepository'

export class CreatePlaylistUseCaseImpl implements CreatePlaylistUseCase {
  constructor (
    private readonly playlistRepository: IPlaylistRepository
  ) {}

  async execute (createPlaylistParams: Pick<PlaylistModel, 'userId' | 'title'>): Promise<PlaylistModel> {
    const alreadyExists = await this.playlistRepository.load(createPlaylistParams.userId, createPlaylistParams.title)

    if (alreadyExists) {
      throw new Error('Playlist already exists')
    }

    const newPlaylist = await this.playlistRepository.create(createPlaylistParams.userId, createPlaylistParams.title)

    return newPlaylist
  }
}
