import {
  LoadMusicsParams,
  MusicResponse,
} from '../../domain/useCases/ILoadMusicsUseCause'
import { SearchedMusicResponse } from '../useCases/ISearchMusicsUseCase'

export interface IMusicRepository {
  load: (music: LoadMusicsParams) => Promise<MusicResponse>

  search: (query: any) => Promise<SearchedMusicResponse>
}
