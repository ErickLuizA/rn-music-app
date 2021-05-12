import {
  LoadMusicsParams,
  MusicResponse,
} from '../../domain/useCases/ILoadMusicsUseCause'
import { Music } from '../entities/Music'

export interface IMusicRepository {
  load: (music: LoadMusicsParams) => Promise<MusicResponse>

  search: (query: any) => Promise<Music[]>
}
