import React from 'react'
import PlaylistScreen from '../../../presentation/screens/Playlist'
import { makeDeletePlaylist } from '../useCases/DeletePlaylistFactory'
import { makeLoadPlaylists } from '../useCases/LoadPlaylistsFactory'
import { makeUpdatePlaylsit } from '../useCases/UpdatePlaylistFactory'

export function makePlaylist() {
  return (
    <PlaylistScreen
      loadPlaylists={makeLoadPlaylists()}
      deletePlaylist={makeDeletePlaylist()}
      updatePlaylist={makeUpdatePlaylsit()}
    />
  )
}
