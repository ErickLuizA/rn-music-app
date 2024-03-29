import { Sound } from '../../domain/entities/Sound'
import { ISoundRepository } from '../../domain/repositories/ISoundRepository'
import { LoadSoundParams } from '../../domain/useCases/ILoadSoundUseCase'
import { IHttpClient } from '../protocols/IHttpClient'

export class SoundRepositoryImpl implements ISoundRepository {
  constructor(private readonly httpClient: IHttpClient) {}

  async load(params: LoadSoundParams): Promise<Sound> {
    const response = await this.httpClient.get(`/audio/${params.id}`)

    return Sound.fromJson(response[0])
  }
}
