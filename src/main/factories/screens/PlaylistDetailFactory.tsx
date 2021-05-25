import React from 'react'
import PlaylistDetail from '../../../presentation/screens/PlaylistDetail'
import { makeDeletePlaylistMusic } from '../useCases/DeletePlaylistMuiscFactory'
import { makeLoadPlaylistMusics } from '../useCases/LoadPlaylistMusicsFactory'

export function makePlaylistDetails() {
  return (
    <PlaylistDetail
      deletePlaylistMusic={makeDeletePlaylistMusic()}
      loadPlaylistMusic={makeLoadPlaylistMusics()}
    />
  )
}
