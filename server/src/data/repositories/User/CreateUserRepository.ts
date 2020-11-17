import { UserModel } from '../../../domain/models/User'
import { UserParams } from '../../../domain/useCases/User/CreateUserUseCase'

export interface CreateUserRepository {
  execute: (params: UserParams) => Promise<UserModel>
}
