import React from 'react'
import PlaylistScreen from '../../../presentation/screens/Playlist'
import { makeDeletePlaylist } from '../useCases/DeletePlaylistFactory'
import { makeLoadPlaylistMusics } from '../useCases/LoadPlaylistMusicsFactory'
import { makeLoadPlaylists } from '../useCases/LoadPlaylistsFactory'
import { makeUpdatePlaylsit } from '../useCases/UpdatePlaylistFactory'

export function makePlaylist() {
  return (
    <PlaylistScreen
      loadPlaylists={makeLoadPlaylists()}
      loadPlaylistMusics={makeLoadPlaylistMusics()}
      deletePlaylist={makeDeletePlaylist()}
      updatePlaylist={makeUpdatePlaylsit()}
    />
  )
}
