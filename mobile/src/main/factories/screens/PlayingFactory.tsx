import React from 'react'
import PlayingScreen from '../../../presentation/screens/Playing'
import { makeCreateFavorite } from '../useCases/CreateFavoriteFactory'
import { makeCreateRecent } from '../useCases/CreateRecentFactory'
import { makeDeleteFavorite } from '../useCases/DeleteFavoriteFactory'
import { makeLoadFavorites } from '../useCases/LoadFavoritesFactory'
import { makeLoadPlaylistMusics } from '../useCases/LoadPlaylistMusicsFactory'
import { makeLoadRecent } from '../useCases/LoadRecentFactory'
import { makeLoadSound } from '../useCases/LoadSoundFactory'

export function makePlaying() {
  return (
    <PlayingScreen
      loadPlaylistMusics={makeLoadPlaylistMusics()}
      loadFavorites={makeLoadFavorites()}
      loadRecent={makeLoadRecent()}
      loadSound={makeLoadSound()}
      createFavorite={makeCreateFavorite()}
      createRecent={makeCreateRecent()}
      deleteFavorite={makeDeleteFavorite()}
    />
  )
}
