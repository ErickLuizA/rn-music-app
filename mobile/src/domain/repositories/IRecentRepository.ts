import { Recent } from '../entities/Recent'
import { CreateRecentParams } from '../useCases/ICreateRecentUseCase'

export interface IRecentRepository {
  create: (params: CreateRecentParams) => Promise<void>

  load: () => Promise<Recent[]>
}
