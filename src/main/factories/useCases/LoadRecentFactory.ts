import { RecentRepositoryImpl } from '../../../data/repositories/RecentRepositoryImpl'
import { LoadRecentUseCaseImpl } from '../../../data/useCases/LoadRecentUseCaseImpl'
import { ILoadRecentUseCase } from '../../../domain/useCases/ILoadRecentUseCase'
import { AsyncStorageRecentLocalClient } from '../../../infra/local/AsyncStorageRecentLocalClient'

export function makeLoadRecent(): ILoadRecentUseCase {
  const localClient = new AsyncStorageRecentLocalClient()

  const recentRepository = new RecentRepositoryImpl(localClient)

  return new LoadRecentUseCaseImpl(recentRepository)
}
