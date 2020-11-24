import { IMusicRepository } from '../../domain/repositories/IMusicRepository'
import {
  LoadMusicsParams,
  ILoadMusicsUseCase,
  MusicResponse,
} from '../../domain/useCases/ILoadMusicsUseCause'

export class LoadMusicsUseCaseImpl implements ILoadMusicsUseCase {
  constructor(private readonly MusicsRepository: IMusicRepository) {}

  async execute(params: LoadMusicsParams): Promise<MusicResponse> {
    try {
      return await this.MusicsRepository.load(params)
    } catch (error) {
      return error
    }
  }
}
