import { Music } from '../../domain/entities/Music'
import { IMusicRepository } from '../../domain/repositories/IMusicRepository'
import { ISearchMusicsUseCase } from '../../domain/useCases/ISearchMusicsUseCase'

export class SearchMusicsUseCaseImpl implements ISearchMusicsUseCase {
  constructor(private readonly musicRepository: IMusicRepository) {}

  async execute(query: any): Promise<Music[]> {
    return await this.musicRepository.search(query)
  }
}
