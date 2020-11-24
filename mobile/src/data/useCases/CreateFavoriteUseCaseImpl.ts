import { IFavoriteRepository } from '../../domain/repositories/IFavoritesRepository'
import {
  CreateFavoritesParams,
  ICreateFavoritesUseCase,
} from '../../domain/useCases/ICreateFavoriteUseCase'

export class CreateFavoriteUseCaseImpl implements ICreateFavoritesUseCase {
  constructor(private readonly favoriteRepository: IFavoriteRepository) {}

  async execute(params: CreateFavoritesParams): Promise<void> {
    return this.favoriteRepository.create(params)
  }
}
