import { Recent } from '../../domain/entities/Recent'
import { IRecentRepository } from '../../domain/repositories/IRecentRepository'
import { CreateRecentParams } from '../../domain/useCases/ICreateRecentUseCase'
import { LoadRecentParams } from '../../domain/useCases/ILoadRecentUseCase'
import { ILocalClient } from '../protocols/ILocalClient'

export class RecentRepositoryImpl implements IRecentRepository {
  constructor(private readonly localClient: ILocalClient) {}

  async create(params: CreateRecentParams): Promise<void> {
    return await this.localClient.create(params)
  }

  async load(params: LoadRecentParams): Promise<Recent[]> {
    return await this.localClient.load(params)
  }
}
