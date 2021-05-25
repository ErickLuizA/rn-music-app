import { Music } from '../entities/Music'

export interface ILoadRecentUseCase {
  execute: () => Promise<Music[]>
}
