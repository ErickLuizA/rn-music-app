import React from 'react'
import Home from '../../../presentation/screens/Home'
import { makeCreateFavorite } from '../useCases/CreateFavoriteFactory'
import { makeDeleteFavorite } from '../useCases/DeleteFavoriteFactory'
import { makeLoadMusics } from '../useCases/LoadMusicsFactory'
import { makeLoadRecent } from '../useCases/LoadRecentFactory'

export function makeHome() {
  return (
    <Home
      loadRecent={makeLoadRecent()}
      loadMusics={makeLoadMusics()}
      createFavorite={makeCreateFavorite()}
      deleteFavorite={makeDeleteFavorite()}
    />
  )
}
