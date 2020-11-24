import { RecentRepositoryImpl } from '../../../data/repositories/RecentRepositoryImpl'
import { LoadRecentUseCaseImpl } from '../../../data/useCases/LoadRecentUseCaseImpl'
import { ILoadRecentUseCase } from '../../../domain/useCases/ILoadRecentUseCase'
import { AsyncStorageClient } from '../../../infra/local/AsyncStorageClient'

export function makeLoadRecent(): ILoadRecentUseCase {
  const asyncStorageClient = new AsyncStorageClient()

  const recentRepository = new RecentRepositoryImpl(asyncStorageClient)

  return new LoadRecentUseCaseImpl(recentRepository)
}
