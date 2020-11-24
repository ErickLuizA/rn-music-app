import { MusicRepositoryImpl } from '../../../data/repositories/MusicRepositoryImpl'
import { SearchMusicsUseCaseImpl } from '../../../data/useCases/SearchMusicsUseCaseImpl'
import { ISearchMusicsUseCase } from '../../../domain/useCases/ISearchMusicsUseCase'
import { AxiosHttpClient } from '../../../infra/http/YtAxiosHttpClient'

export function makeSearchMusics(): ISearchMusicsUseCase {
  const axiosHttpClient = new AxiosHttpClient()

  const musicRepository = new MusicRepositoryImpl(axiosHttpClient)

  return new SearchMusicsUseCaseImpl(musicRepository)
}
