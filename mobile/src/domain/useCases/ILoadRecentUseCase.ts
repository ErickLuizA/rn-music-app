import { Recent } from '../entities/Recent'

export type LoadRecentParams = string

export interface ILoadRecentUseCase {
  execute: (params: LoadRecentParams) => Promise<Recent[]>
}
