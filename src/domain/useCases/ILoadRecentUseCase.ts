import { RecentResponse } from '../entities/Recent'

export interface ILoadRecentUseCase {
  execute: () => Promise<RecentResponse[]>
}
