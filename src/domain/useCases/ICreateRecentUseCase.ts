import { Music } from '../entities/Music'

export type CreateRecentParams = Music

export interface ICreateRecentUseCase {
  execute: (params: CreateRecentParams) => Promise<void>
}
