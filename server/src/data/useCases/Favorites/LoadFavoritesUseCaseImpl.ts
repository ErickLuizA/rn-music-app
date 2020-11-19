import { FavoriteMusicModel } from '../../../domain/models/FavoriteMusic'
import { LoadFavoritesUseCase } from '../../../domain/useCases/Favorites/LoadFavoritesUseCase'
import { IFavoriteRepository } from '../../repositories/IFavoriteRepository'

export class LoadFavoritesUseCaseImpl implements LoadFavoritesUseCase {
  constructor (
    private readonly favoriteRepository: IFavoriteRepository
  ) {}

  async execute (userId: string): Promise<FavoriteMusicModel[]> {
    return await this.favoriteRepository.loadAll(userId)
  }
}
