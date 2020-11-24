import { IFavoriteRepository } from '../../domain/repositories/IFavoritesRepository'
import {
  DeleteFavoritesParams,
  IDeleteFavoritesUseCase,
} from '../../domain/useCases/IDeleteFavoriteUseCase'

export class DeleteFavoriteUseCaseImpl implements IDeleteFavoritesUseCase {
  constructor(private readonly favoriteRepository: IFavoriteRepository) {}

  async execute(params: DeleteFavoritesParams): Promise<void> {
    return this.favoriteRepository.delete(params)
  }
}
