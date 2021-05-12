import { Music } from '../entities/Music'

export interface ISearchMusicsUseCase {
  execute: (query: any) => Promise<Music[]>
}
