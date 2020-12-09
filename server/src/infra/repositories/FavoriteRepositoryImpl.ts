import { IFavoriteRepository } from '../../data/repositories/IFavoriteRepository'
import { FavoriteMusicModel } from '../../domain/models/FavoriteMusic'
import { CreateFavoriteParams } from '../../domain/useCases/Favorites/CreateFavoriteUseCase'
import database from '../query-builder/knex/connection'

export class FavoriteRepositoryImpl implements IFavoriteRepository {
  async create (createFavoriteParams: CreateFavoriteParams): Promise<FavoriteMusicModel> {
    return await database('favorites').insert(createFavoriteParams).returning('*') as any
  }

  async load (userId: string, musicId: string): Promise<FavoriteMusicModel> {
    return await database('favorites').where({ userId, musicId }).first()
  }

  async loadAll (userId: string): Promise<FavoriteMusicModel[]> {
    return await database('favorites').where('userId', userId)
  }

  async delete (favoriteId: string, userId: string): Promise<number> {
    return await database('favorites').where({ favoriteId, userId }).delete()
  }
}
