import { PlayingMusic } from '../../../domain/entities/Music'
import { ICreateRecentUseCase } from '../../../domain/useCases/ICreateRecentUseCase'
import { ILoadFavoritesUseCase } from '../../../domain/useCases/ILoadFavoritesUseCase'
import { ILoadPlaylistMusicUseCase } from '../../../domain/useCases/ILoadPlaylistMusicsUseCase'
import { ILoadRecentUseCase } from '../../../domain/useCases/ILoadRecentUseCase'

export async function getFavorites(
  loadFavorites: ILoadFavoritesUseCase,
  data: PlayingMusic,
): Promise<boolean> {
  const response = await loadFavorites.execute()
  let val = false

  if (response?.length > 0) {
    response.forEach((item) => {
      if (item.musicId === data?.id) {
        val = true
      }
    })
  }

  return val
}

export async function getPlaylistMusics(
  loadPlaylistMusics: ILoadPlaylistMusicUseCase,
  data: PlayingMusic,
): Promise<boolean> {
  const response = await loadPlaylistMusics.execute({
    playlistId: data?.id,
  })

  let val = false

  if (response?.length > 0) {
    response.forEach((item) => {
      if (item.id === data?.id) {
        val = true
      }
    })
  }

  return val
}

export async function setRecent(
  loadRecent: ILoadRecentUseCase,
  createRecent: ICreateRecentUseCase,
  data: PlayingMusic,
) {
  const playedMusic = await loadRecent.execute()

  for (const played in playedMusic) {
    if (playedMusic[played]._raw.music_id === data?.id) {
      return
    }
  }

  await createRecent.execute({
    music_id: data?.id,
    img: data?.img,
    title: data?.title,
  })
}
