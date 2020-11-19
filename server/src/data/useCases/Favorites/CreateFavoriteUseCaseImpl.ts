import { FavoriteMusicModel } from '../../../domain/models/FavoriteMusic'
import { CreateFavoriteParams, CreateFavoriteUseCase } from '../../../domain/useCases/Favorites/CreateFavoriteUseCase'
import { IFavoriteRepository } from '../../repositories/IFavoriteRepository'

export class CreateFavoriteUseCaseImpl implements CreateFavoriteUseCase {
  constructor (
    private readonly favoriteRepository: IFavoriteRepository
  ) {}

  async execute (createFavoriteParams: CreateFavoriteParams): Promise<FavoriteMusicModel> {
    const alreadyExists = await this.favoriteRepository.load(createFavoriteParams.userId, createFavoriteParams.musicId)

    if (alreadyExists) {
      throw new Error('Favorite already exists')
    }

    const newFavorite = await this.favoriteRepository.create(createFavoriteParams)

    return newFavorite
  }
}
