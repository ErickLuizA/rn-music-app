import { Recent } from '../entities/Recent'
import { CreateRecentParams } from '../useCases/ICreateRecentUseCase'
import { LoadRecentParams } from '../useCases/ILoadRecentUseCase'

export interface IRecentRepository {
  create: (params: CreateRecentParams) => Promise<void>

  load: (params: LoadRecentParams) => Promise<Recent[]>
}
