import React from 'react'
import FavoritesScreen from '../../../presentation/screens/Favorites'
import { makeLoadFavorites } from '../useCases/LoadFavoritesFactory'

export function makeFavorites() {
  return <FavoritesScreen loadFavorites={makeLoadFavorites()} />
}
