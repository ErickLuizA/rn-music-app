import { Music } from '../../domain/entities/Music'
import { Playlist } from '../../domain/entities/Playlist'
import { IPlaylistRepository } from '../../domain/repositories/IPlaylistsRepository'
import { AddPlaylistParams } from '../../domain/useCases/IAddPlaylistMusicUseCase'
import { DeletePlaylistMusicParams } from '../../domain/useCases/IDeletePlaylistMusicUseCase'
import { LoadPlaylistMusicsParams } from '../../domain/useCases/ILoadPlaylistMusicsUseCase'
import { UpdatePlaylistParams } from '../../domain/useCases/IUpdatePlaylistUseCase'
import { IHttpClient } from '../protocols/IHttpClient'

export class PlaylistRepositoryImpl implements IPlaylistRepository {
  constructor(private readonly httpClient: IHttpClient) {}

  async create(params: Pick<Playlist, 'title'>): Promise<void> {
    return await this.httpClient.post('/playlist', params)
  }

  async add(params: AddPlaylistParams): Promise<void> {
    return await this.httpClient.post('/playlist_music', params)
  }

  async loadAll(): Promise<Playlist[]> {
    return await this.httpClient.get('/playlists')
  }

  async load(params: LoadPlaylistMusicsParams): Promise<Music[]> {
    return await this.httpClient.get(`/playlist_musics/${params.playlistId}`)
  }

  async update(params: UpdatePlaylistParams): Promise<void> {
    return await this.httpClient.update('/playlist', params)
  }

  async delete(params: Pick<Playlist, 'playlistId'>): Promise<void> {
    return await this.httpClient.delete(`/playlist/${params.playlistId}`)
  }

  async deleteMusic(params: DeletePlaylistMusicParams): Promise<void> {
    return await this.httpClient.delete('/playlist_music', params)
  }
}
