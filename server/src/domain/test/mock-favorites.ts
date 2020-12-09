import { CreateFavoriteParams } from '../useCases/Favorites/CreateFavoriteUseCase'
import faker from 'faker'

export function mockCreateFavorieParams (): CreateFavoriteParams {
  return {
    userId: faker.random.uuid(),
    musicId: faker.random.uuid(),
    title: faker.name.title(),
    img: faker.internet.avatar()
  }
}
