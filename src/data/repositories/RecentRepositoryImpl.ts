import { Music } from '../../domain/entities/Music'
import { IRecentRepository } from '../../domain/repositories/IRecentRepository'
import { CreateRecentParams } from '../../domain/useCases/ICreateRecentUseCase'
import { IRecentLocalClient } from '../protocols/IRecentLocalClient'

export class RecentRepositoryImpl implements IRecentRepository {
  constructor(private readonly localClient: IRecentLocalClient) {}

  async create(params: CreateRecentParams): Promise<void> {
    return await this.localClient.create(params)
  }

  async load(): Promise<Music[]> {
    return await this.localClient.get()
  }
}
