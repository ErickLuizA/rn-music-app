import { IPlaylistRepository } from '../../data/repositories/IPlaylistRepository'
import { MusicModel } from '../../domain/models/Music'
import { PlaylistModel } from '../../domain/models/Playlist'
import database from '../query-builder/knex/connection'

export class PlaylistRepositoryImpl implements IPlaylistRepository {
  async create (userId: string, title: string): Promise<PlaylistModel> {
    return await database('playlist').insert({ userId, title }).returning('*') as any
  }

  async createMusic (musicId: string, title: string, img: string, playlistId: string): Promise<MusicModel> {
    return await database('playlist_music').insert({ musicId, title, img, playlistId }).returning('*') as any
  }

  async load (userId: string, title: string): Promise<PlaylistModel> {
    return await database('playlist').where({ userId, title }).first()
  }

  async loadAll (userId: string): Promise<PlaylistModel[]> {
    return await database('playlist').where({ userId })
  }

  async loadMusic (playlistId: string, musicId: string): Promise<MusicModel> {
    console.log(playlistId, musicId)

    return await database('playlist_music').where({ playlistId, musicId }).first()
  }

  async loadMusics (playlistId: string): Promise<MusicModel[]> {
    return await database('playlist_music').where({ playlistId })
  }

  async update (userId: string, playlistId: string, title: string): Promise<number | undefined> {
    return await database('playlist').update({ title }).where({ userId, playlistId })
  }

  async delete (userId: string, playlistId: string): Promise<number> {
    return await database('playlist').del().where({ userId, playlistId })
  }

  async deleteMusic (playlistId: string, playlistMusicId: string): Promise<number> {
    return await database('playlist_music').del().where({ playlistId, playlistMusicId })
  }
}
