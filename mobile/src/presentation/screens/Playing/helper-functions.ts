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
    const isFavorited = response.find(
      (music) => music.musicId === searchedData.id.videoId || data?.id,
    )

    return Boolean(isFavorited)
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
    const onPlaylist = response.find(
      (music) => music.id === searchedData.id.videoId || data?.id,
    )

    return Boolean(onPlaylist)
  }

  return false
}

export async function setRecent(
  loadRecent: ILoadRecentUseCase,
  createRecent: ICreateRecentUseCase,
  searchedData: SearchedData,
  data: PlayingMusic,
) {
  const playedMusic = await loadRecent.execute('@RNplayed')

  if (playedMusic?.length < 0) {
    await createRecent.execute({
      id: searchedData.id.videoId || data?.id,
      img: data?.img,
      title: data?.title,
    })
  } else if (
    playedMusic &&
    playedMusic.find((m) => m.id === searchedData.id.videoId || data?.id)
  ) {
    await createRecent.execute({
      id: searchedData.id.videoId || data?.id,
      img: data?.img,
      title: data?.title,
    })
  }
}
