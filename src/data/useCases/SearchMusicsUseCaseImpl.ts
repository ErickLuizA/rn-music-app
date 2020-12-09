import { IMusicRepository } from '../../domain/repositories/IMusicRepository'
import {
  ISearchMusicsUseCase,
  SearchedMusicResponse,
} from '../../domain/useCases/ISearchMusicsUseCase'

export class SearchMusicsUseCaseImpl implements ISearchMusicsUseCase {
  constructor(private readonly musicRepository: IMusicRepository) {}

  async execute(query: any): Promise<SearchedMusicResponse> {
    return await this.musicRepository.search(query)
  }
}
