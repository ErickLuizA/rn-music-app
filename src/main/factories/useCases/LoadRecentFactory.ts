import { RecentRepositoryImpl } from '../../../data/repositories/RecentRepositoryImpl'
import { LoadRecentUseCaseImpl } from '../../../data/useCases/LoadRecentUseCaseImpl'
import { ILoadRecentUseCase } from '../../../domain/useCases/ILoadRecentUseCase'
import { RecentLocalClient } from '../../../infra/local/RecentLocalClient'

export function makeLoadRecent(): ILoadRecentUseCase {
  const localClient = new RecentLocalClient()

  const recentRepository = new RecentRepositoryImpl(localClient)

  return new LoadRecentUseCaseImpl(recentRepository)
}
