import { MusicRepositoryImpl } from '../../../data/repositories/MusicRepositoryImpl'
import { LoadMusicsUseCaseImpl } from '../../../data/useCases/LoadMusicsUseCaseImpl'
import { ILoadMusicsUseCase } from '../../../domain/useCases/ILoadMusicsUseCause'
import { AxiosHttpClient } from '../../../infra/http/YtAxiosHttpClient'

export function makeLoadMusics(): ILoadMusicsUseCase {
  const ytAxiosHttpClient = new AxiosHttpClient()

  const userRepository = new MusicRepositoryImpl(ytAxiosHttpClient)

  return new LoadMusicsUseCaseImpl(userRepository)
}
