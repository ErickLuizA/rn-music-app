import React from 'react'
import Home from '../../../presentation/screens/Home'
import { makeAddPlaylistMusic } from '../useCases/AddPlaylistMusicFactory'
import { makeCreateFavorite } from '../useCases/CreateFavoriteFactory'
import { makeCreatePlaylist } from '../useCases/CreatePlaylistFactory'
import { makeCreateRecent } from '../useCases/CreateRecentFactory'
import { makeDeleteFavorite } from '../useCases/DeleteFavoriteFactory'
import { makeLoadFavorites } from '../useCases/LoadFavoritesFactory'
import { makeLoadMusics } from '../useCases/LoadMusicsFactory'
import { makeLoadPlaylistMusics } from '../useCases/LoadPlaylistMusicsFactory'
import { makeLoadPlaylists } from '../useCases/LoadPlaylistsFactory'
import { makeLoadRecent } from '../useCases/LoadRecentFactory'
import { makeLoadSound } from '../useCases/LoadSoundFactory'

export function makeHome() {
  return (
    <Home
      loadRecent={makeLoadRecent()}
      loadMusics={makeLoadMusics()}
      loadPlaylistMusics={makeLoadPlaylistMusics()}
      loadFavorites={makeLoadFavorites()}
      loadSound={makeLoadSound()}
      createFavorite={makeCreateFavorite()}
      createRecent={makeCreateRecent()}
      deleteFavorite={makeDeleteFavorite()}
      addPlaylistMusic={makeAddPlaylistMusic()}
      createPlaylistUseCase={makeCreatePlaylist()}
      loadPlaylists={makeLoadPlaylists()}
    />
  )
}
