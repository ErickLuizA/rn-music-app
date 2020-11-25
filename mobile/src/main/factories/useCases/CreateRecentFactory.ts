import { RecentRepositoryImpl } from '../../../data/repositories/RecentRepositoryImpl'
import { CreateRecentUseCaseImpl } from '../../../data/useCases/CreateRecentUseCaseImpl'
import { AsyncStorageClient } from '../../../infra/local/AsyncStorageClient'

export function makeCreateRecent() {
  const localClient = new AsyncStorageClient()

  const recentRepository = new RecentRepositoryImpl(localClient)

  return new CreateRecentUseCaseImpl(recentRepository)
}
