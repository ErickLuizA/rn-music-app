import { Sound } from '../entities/Sound'
import { LoadSoundParams } from '../useCases/ILoadSoundUseCase'

export interface ISoundRepository {
  load: (params: LoadSoundParams) => Promise<Sound>
}
