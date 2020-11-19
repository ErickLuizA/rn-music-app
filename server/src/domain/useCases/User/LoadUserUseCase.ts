import { UserModel } from '../../models/User'

export interface LoadUserUseCase {
  byEmail: (email: string) => Promise<UserModel>

  byId: (id: string) => Promise<UserModel>
}
