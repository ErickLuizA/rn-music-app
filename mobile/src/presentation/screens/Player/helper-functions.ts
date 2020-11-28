import { PlayingMusic, SearchedData } from '../../../domain/entities/Music'
import { ICreateRecentUseCase } from '../../../domain/useCases/ICreateRecentUseCase'
import { ILoadFavoritesUseCase } from '../../../domain/useCases/ILoadFavoritesUseCase'
import { ILoadPlaylistMusicUseCase } from '../../../domain/useCases/ILoadPlaylistMusicsUseCase'
import { ILoadRecentUseCase } from '../../../domain/useCases/ILoadRecentUseCase'

export async function getFavorites(
  loadFavorites: ILoadFavoritesUseCase,
  searchedData: SearchedData,
  data: PlayingMusic,
): Promise<boolean> {
  const response = await loadFavorites.execute()

  if (response?.length > 0) {
    response.forEach((item) => {
      if (item.musicId === searchedData.id.videoId || data?.id) {
        return true
      }
    })
  }

  return false
}

export async function getPlaylistMusics(
  loadPlaylistMusics: ILoadPlaylistMusicUseCase,
  searchedData: SearchedData,
  data: PlayingMusic,
): Promise<boolean> {
  const response = await loadPlaylistMusics.execute({
    playlistId: searchedData.id.videoId || data?.id,
  })

  if (response?.length > 0) {
    response.forEach((item) => {
      if (item.id === searchedData.id.videoId || data?.id) {
        return true
      }
    })
  }

  return false
}

export async function setRecent(
  loadRecent: ILoadRecentUseCase,
  createRecent: ICreateRecentUseCase,
  searchedData: SearchedData,
  data: PlayingMusic,
) {
  // const playedMusic = await loadRecent.execute('@RNplayed')
  // console.log('playedMusic', playedMusic)
  // await createRecent.execute({
  //   id: searchedData.id.videoId || data?.id,
  //   img: data?.img,
  //   title: data?.title,
  // })
}
