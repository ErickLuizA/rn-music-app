import { SearchedMusic } from '../entities/Music'

export interface SearchedMusicResponse {
  items: SearchedMusic[]
}

export interface ISearchMusicsUseCase {
  execute: (query: any) => Promise<SearchedMusicResponse>
}
