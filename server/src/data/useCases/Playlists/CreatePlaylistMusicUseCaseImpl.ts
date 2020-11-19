import { MusicModel } from '../../../domain/models/Music'
import { CreatePlaylistMusicUseCase } from '../../../domain/useCases/Playlists/CreatePlaylistMusicUseCase'
import { IPlaylistRepository } from '../../repositories/IPlaylistRepository'

export class CreatePlaylistMusicUseCaseImpl implements CreatePlaylistMusicUseCase {
  constructor (
    private readonly playlistRepository: IPlaylistRepository
  ) {}

  async execute (musicId: string, title: string, img: string, playlistId: string): Promise<MusicModel> {
    const alreadyExists = await this.playlistRepository.loadMusic(musicId, playlistId)

    if (alreadyExists) {
      throw new Error('This music already belongs to the playlist.')
    }

    return await this.playlistRepository.createMusic(musicId, title, img, playlistId)
  }
}
