import { Music } from '../../domain/entities/Music'
import { IMusicRepository } from '../../domain/repositories/IMusicRepository'
import {
  LoadMusicsParams,
  ILoadMusicsUseCase,
} from '../../domain/useCases/ILoadMusicsUseCause'

export class LoadMusicsUseCaseImpl implements ILoadMusicsUseCase {
  constructor(private readonly MusicsRepository: IMusicRepository) {}

  async execute(params: LoadMusicsParams): Promise<Music[]> {
    return await this.MusicsRepository.load(params)
  }
}
