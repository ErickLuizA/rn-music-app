import { IRecentRepository } from '../../domain/repositories/IRecentRepository'
import {
  ICreateRecentUseCase,
  CreateRecentParams,
} from '../../domain/useCases/ICreateRecentUseCase'

export class CreateRecentUseCaseImpl implements ICreateRecentUseCase {
  constructor(private readonly recentRepository: IRecentRepository) {}

  async execute(params: CreateRecentParams): Promise<void> {
    return await this.recentRepository.create(params)
  }
}
