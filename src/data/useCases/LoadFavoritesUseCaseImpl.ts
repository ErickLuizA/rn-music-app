import { Music } from '../../domain/entities/Music'
import { IFavoriteRepository } from '../../domain/repositories/IFavoritesRepository'
import { ILoadFavoritesUseCase } from '../../domain/useCases/ILoadFavoritesUseCase'

export class LoadFavoriteUseCaseImpl implements ILoadFavoritesUseCase {
  constructor(private readonly favoriteRepository: IFavoriteRepository) {}

  async execute(): Promise<Music[]> {
    return this.favoriteRepository.load()
  }
}
