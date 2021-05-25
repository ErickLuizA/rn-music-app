import { RecentRepositoryImpl } from '../../../data/repositories/RecentRepositoryImpl'
import { CreateRecentUseCaseImpl } from '../../../data/useCases/CreateRecentUseCaseImpl'
import { AsyncStorageRecentLocalClient } from '../../../infra/local/AsyncStorageRecentLocalClient'

export function makeCreateRecent() {
  const localClient = new AsyncStorageRecentLocalClient()

  const recentRepository = new RecentRepositoryImpl(localClient)

  return new CreateRecentUseCaseImpl(recentRepository)
}
