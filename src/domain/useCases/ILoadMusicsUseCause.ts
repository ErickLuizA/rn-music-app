import { Music } from '../entities/Music'

export interface LoadMusicsParams {
  part: string
  videoCategoryId: string
  chart: string
  maxResults: number
  key: string
}

export interface ILoadMusicsUseCase {
  execute: (params: LoadMusicsParams) => Promise<Music[]>
}
