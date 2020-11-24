import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { makePlaylist } from '../factories/screens/PlaylistsFactory'

const { Navigator, Screen } = createStackNavigator()

function PlaylistStack() {
  return (
    <Navigator initialRouteName="Home">
      <Screen
        name="Playlist"
        component={makePlaylist}
        options={{ headerShown: false }}
      />
      {/* <Screen
        name="PlaylistDetailScreen"
        component={PlaylistDetailScreen}
        options={{ headerShown: false }}
      /> */}
    </Navigator>
  )
}

export default PlaylistStack
