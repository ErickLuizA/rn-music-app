import { RecentRepositoryImpl } from '../../../data/repositories/RecentRepositoryImpl'
import { CreateRecentUseCaseImpl } from '../../../data/useCases/CreateRecentUseCaseImpl'
import { RecentLocalClient } from '../../../infra/local/RecentLocalClient'

export function makeCreateRecent() {
  const localClient = new RecentLocalClient()

  const recentRepository = new RecentRepositoryImpl(localClient)

  return new CreateRecentUseCaseImpl(recentRepository)
}
