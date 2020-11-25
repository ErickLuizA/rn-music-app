import React from 'react'
import PlayingScreen from '../../../presentation/screens/Playing'
import { makeAddPlaylistMusic } from '../useCases/AddPlaylistMusicFactory'
import { makeCreateFavorite } from '../useCases/CreateFavoriteFactory'
import { makeCreatePlaylist } from '../useCases/CreatePlaylistFactory'
import { makeCreateRecent } from '../useCases/CreateRecentFactory'
import { makeDeleteFavorite } from '../useCases/DeleteFavoriteFactory'
import { makeLoadFavorites } from '../useCases/LoadFavoritesFactory'
import { makeLoadPlaylistMusics } from '../useCases/LoadPlaylistMusicsFactory'
import { makeLoadPlaylists } from '../useCases/LoadPlaylistsFactory'
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
      addPlaylistMusic={makeAddPlaylistMusic()}
      createPlaylistUseCase={makeCreatePlaylist()}
      loadPlaylists={makeLoadPlaylists()}
    />
  )
}
