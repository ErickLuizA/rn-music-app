import { ILoadRecentUseCase } from '../../domain/useCases/ILoadRecentUseCase'
import { IRecentRepository } from '../../domain/repositories/IRecentRepository'
import { Music } from '../../domain/entities/Music'

export class LoadRecentUseCaseImpl implements ILoadRecentUseCase {
  constructor(private readonly recentRepository: IRecentRepository) {}

  async execute(): Promise<Music[]> {
    return await this.recentRepository.load()
  }
}
