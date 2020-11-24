import {
  LoadMusicsParams,
  MusicResponse,
} from '../../domain/useCases/ILoadMusicsUseCause'

export interface IMusicRepository {
  load: (music: LoadMusicsParams) => Promise<MusicResponse>
}
