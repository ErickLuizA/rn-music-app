import { SoundRepositoryImpl } from '../../../data/repositories/SoundRepositoryImpl'
import { LoadSoundUseCaseImpl } from '../../../data/useCases/LoadSoundUseCaseImpl'
import { ILoadSoundUseCase } from '../../../domain/useCases/ILoadSoundUseCase'
import { AxiosHttpClient } from '../../../infra/http/AxiosHttpClient'

export function makeLoadSound(): ILoadSoundUseCase {
  const axiosHttpClient = new AxiosHttpClient()

  const SoundRepository = new SoundRepositoryImpl(axiosHttpClient)

  return new LoadSoundUseCaseImpl(SoundRepository)
}
