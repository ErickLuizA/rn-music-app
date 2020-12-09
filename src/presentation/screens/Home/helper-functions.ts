import { Favorite } from '../../../domain/entities/Favorite'
import { PlayingMusic } from '../../../domain/entities/Music'
import { ICreateRecentUseCase } from '../../../domain/useCases/ICreateRecentUseCase'
import { ILoadFavoritesUseCase } from '../../../domain/useCases/ILoadFavoritesUseCase'
import { ILoadRecentUseCase } from '../../../domain/useCases/ILoadRecentUseCase'

export async function getFavorites(
  loadFavorites: ILoadFavoritesUseCase,
  data: PlayingMusic,
): Promise<string | null> {
  const response = await loadFavorites.execute()
  let fav: string | null = null

  if (response?.length > 0) {
    response.forEach((item) => {
      if (item.musicId === data?.id) {
        fav = item.favoriteId
      }
    })
  }

  return fav
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
