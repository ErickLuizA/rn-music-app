import { videoFormat } from 'ytdl-core'
import { LoadAudioUseCaseImpl } from '../../../../data/useCases/Audio/LoadAudioUseCaseImpl'
import { AudioRepositoryImpl } from '../../../../infra/repositories/AudioRepositoryImpl'
import { LoadAudioController } from '../../../../presentation/controllers/Audio/LoadAudioController'

export function makeLoadAudioController (): LoadAudioController<videoFormat> {
  const audioRepository = new AudioRepositoryImpl()

  const loadAudioUseCase = new LoadAudioUseCaseImpl(audioRepository)

  const loadAudioController = new LoadAudioController(loadAudioUseCase)

  return loadAudioController
}
