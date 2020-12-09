import { Recent } from '../entities/Recent'

export type CreateRecentParams = Recent

export interface ICreateRecentUseCase {
  execute: (params: CreateRecentParams) => Promise<void>
}
