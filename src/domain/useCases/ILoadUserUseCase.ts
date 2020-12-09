import { User } from '../entities/User'

export interface ILoadUserUseCase {
  execute: () => Promise<User>
}
