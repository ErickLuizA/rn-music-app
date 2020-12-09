import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { makePlaylist } from '../factories/screens/PlaylistsFactory'
import { makePlaylistDetails } from '../factories/screens/PlaylistDetailFactory'

const { Navigator, Screen } = createStackNavigator()

function PlaylistStack() {
  return (
    <Navigator initialRouteName="Home">
      <Screen
        name="Playlist"
        component={makePlaylist}
        options={{ headerShown: false }}
      />
      <Screen
        name="PlaylistDetailScreen"
        component={makePlaylistDetails}
        options={{ headerShown: false }}
      />
    </Navigator>
  )
}

export default PlaylistStack
