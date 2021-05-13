import { Sound } from '../entities/Sound'

export interface LoadSoundParams {
  id: string
}

export interface ILoadSoundUseCase {
  execute: (params: LoadSoundParams) => Promise<Sound>
}
