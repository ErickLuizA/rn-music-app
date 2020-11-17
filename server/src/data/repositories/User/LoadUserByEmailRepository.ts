import { UserModel } from '../../../domain/models/User'

export interface LoadUserByEmailRepository {
  load: (email: string) => Promise<UserModel>
}
