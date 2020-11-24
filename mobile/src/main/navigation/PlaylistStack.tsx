import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

const { Navigator } = createStackNavigator()

function PlaylistStack() {
  return (
    <Navigator initialRouteName="Home">
      {/* <Screen
        name="Playlist"
        component={PlaylistScreen}
        options={{ headerShown: false }}
      />
      <Screen
        name="PlaylistDetailScreen"
        component={PlaylistDetailScreen}
        options={{ headerShown: false }}
      /> */}
    </Navigator>
  )
}

export default PlaylistStack
