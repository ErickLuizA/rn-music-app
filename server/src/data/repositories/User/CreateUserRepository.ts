import { UserModel } from '../../../domain/models/User'
import { UserParams } from '../../../domain/useCases/User/CreateUserUseCase'

export interface CreateUserRepository {
  create: (params: UserParams) => Promise<UserModel>
}
