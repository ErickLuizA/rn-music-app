import { Sound } from '../../domain/entities/Sound'
import { ISoundRepository } from '../../domain/repositories/ISoundRepository'
import {
  ILoadSoundUseCase,
  LoadSoundParams,
} from '../../domain/useCases/ILoadSoundUseCase'

export class LoadSoundUseCaseImpl implements ILoadSoundUseCase {
  constructor(private readonly soundRepository: ISoundRepository) {}

  async execute(params: LoadSoundParams): Promise<Sound> {
    return await this.soundRepository.load(params)
  }
}
