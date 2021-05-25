import React from 'react'
import Player from '../../../presentation/screens/Player'
import { makeAddPlaylistMusic } from '../useCases/AddPlaylistMusicFactory'
import { makeCreateFavorite } from '../useCases/CreateFavoriteFactory'
import { makeCreatePlaylist } from '../useCases/CreatePlaylistFactory'
import { makeCreateRecent } from '../useCases/CreateRecentFactory'
import { makeDeleteFavorite } from '../useCases/DeleteFavoriteFactory'
import { makeLoadFavorites } from '../useCases/LoadFavoritesFactory'
import { makeLoadPlaylists } from '../useCases/LoadPlaylistsFactory'
import { makeLoadSound } from '../useCases/LoadSoundFactory'

export function makePlayer() {
  return (
    <Player
      loadSound={makeLoadSound()}
      createRecent={makeCreateRecent()}
      deleteFavorite={makeDeleteFavorite()}
      createFavorite={makeCreateFavorite()}
      loadFavorites={makeLoadFavorites()}
      addPlaylistMusic={makeAddPlaylistMusic()}
      createPlaylist={makeCreatePlaylist()}
      loadPlaylists={makeLoadPlaylists()}
    />
  )
}
