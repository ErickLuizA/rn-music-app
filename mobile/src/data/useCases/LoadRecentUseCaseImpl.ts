import { Recent } from '../../domain/entities/Recent'
import {
  ILoadRecentUseCase,
  LoadRecentParams,
} from '../../domain/useCases/ILoadRecentUseCase'
import { IRecentRepository } from '../../domain/repositories/IRecentRepository'

export class LoadRecentUseCaseImpl implements ILoadRecentUseCase {
  constructor(private readonly recentRepository: IRecentRepository) {}

  async execute(params: LoadRecentParams): Promise<Recent[]> {
    return await this.recentRepository.load(params)
  }
}
