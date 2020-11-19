import { IFavoriteRepository } from '../../data/repositories/IFavoriteRepository'
import { FavoriteMusicModel } from '../../domain/models/FavoriteMusic'
import { CreateFavoriteParams } from '../../domain/useCases/Favorites/CreateFavoriteUseCase'
import database from '../query-builder/knex/connection'

export class FavoriteRepositoryImpl implements IFavoriteRepository {
  async create (createFavoriteParams: CreateFavoriteParams): Promise<FavoriteMusicModel> {
    const result = await database('favorites').insert(createFavoriteParams).returning('*') as any

    return result
  }

  async load (userId: string, musicId: string): Promise<FavoriteMusicModel> {
    return await database('favorites').where({ userId, musicId }).first()
  }

  async loadAll (userId: string): Promise<FavoriteMusicModel> {
    return await database('favorites').where('userId', userId).first()
  }
}
