import { PlaylistMusic } from '../entities/Music'
import { Playlist } from '../entities/Playlist'
import { AddPlaylistParams } from '../useCases/IAddPlaylistMusicUseCase'
import { CreatePlaylistParams } from '../useCases/ICreatePlaylistUseCase'
import { DeletePlaylistMusicParams } from '../useCases/IDeletePlaylistMusicUseCase'
import { DeletePlaylistParams } from '../useCases/IDeletePlaylistUseCase'
import { LoadPlaylistMusicsParams } from '../useCases/ILoadPlaylistMusicsUseCase'
import { UpdatePlaylistParams } from '../useCases/IUpdatePlaylistUseCase'

export interface IPlaylistRepository {
  create: (params: CreatePlaylistParams) => Promise<void>

  add: (params: AddPlaylistParams) => Promise<void>

  loadAll: () => Promise<Playlist[]>

  load: (params: LoadPlaylistMusicsParams) => Promise<PlaylistMusic[]>

  update: (params: UpdatePlaylistParams) => Promise<void>

  delete: (params: DeletePlaylistParams) => Promise<void>

  deleteMusic: (params: DeletePlaylistMusicParams) => Promise<void>
}
