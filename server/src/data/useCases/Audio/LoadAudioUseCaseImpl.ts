import { LoadAudioUseCase } from '../../../domain/useCases/Audio/LoadAudioUseCase'
import { IAudioRepository } from '../../repositories/IAudioRepository'

export class LoadAudioUseCaseImpl<T> implements LoadAudioUseCase<T> {
  constructor (
    private readonly audioRepository: IAudioRepository<T>
  ) {}

  async execute (id: string): Promise<T[]> {
    return await this.audioRepository.load(id)
  }
}
