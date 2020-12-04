import React from 'react'
import FavoritesScreen from '../../../presentation/screens/Favorites'
import { makeDeleteFavorite } from '../useCases/DeleteFavoriteFactory'
import { makeLoadFavorites } from '../useCases/LoadFavoritesFactory'

export function makeFavorites() {
  return (
    <FavoritesScreen
      loadFavorites={makeLoadFavorites()}
      deleteFavorite={makeDeleteFavorite()}
    />
  )
}
