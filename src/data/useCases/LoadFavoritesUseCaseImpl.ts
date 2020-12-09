import { Favorite } from '../../domain/entities/Favorite'
import { IFavoriteRepository } from '../../domain/repositories/IFavoritesRepository'
import { ILoadFavoritesUseCase } from '../../domain/useCases/ILoadFavoritesUseCase'

export class LoadFavoriteUseCaseImpl implements ILoadFavoritesUseCase {
  constructor(private readonly favoriteRepository: IFavoriteRepository) {}

  async execute(): Promise<Favorite[]> {
    return this.favoriteRepository.load()
  }
}
