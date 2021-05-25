import { Music } from '../entities/Music'
import { CreateRecentParams } from '../useCases/ICreateRecentUseCase'

export interface IRecentRepository {
  create: (params: CreateRecentParams) => Promise<void>

  load: () => Promise<Music[]>
}
