import { Music } from '../entities/Music'
import { LoadMusicsParams } from '../useCases/ILoadMusicsUseCause'

export interface IMusicRepository {
  load: (music: LoadMusicsParams) => Promise<Music[]>

  search: (query: any) => Promise<Music[]>
}
