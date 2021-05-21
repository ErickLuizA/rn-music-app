import React from 'react'
import Player from '../../../presentation/screens/Player'
import { makeCreateFavorite } from '../useCases/CreateFavoriteFactory'
import { makeCreateRecent } from '../useCases/CreateRecentFactory'
import { makeDeleteFavorite } from '../useCases/DeleteFavoriteFactory'
import { makeLoadFavorites } from '../useCases/LoadFavoritesFactory'
import { makeLoadSound } from '../useCases/LoadSoundFactory'

export function makePlayer() {
  return (
    <Player
      loadSound={makeLoadSound()}
      createRecent={makeCreateRecent()}
      deleteFavorite={makeDeleteFavorite()}
      createFavorite={makeCreateFavorite()}
      loadFavorites={makeLoadFavorites()}
    />
  )
}
