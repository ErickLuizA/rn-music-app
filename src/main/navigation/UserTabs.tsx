import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { makeFavorites } from '../factories/screens/FavoritesFactory'
import PlaylistStack from './PlaylistStack'
import { makeUser } from '../factories/screens/UserFactory'

const { Navigator, Screen } = createMaterialTopTabNavigator()

export default function UserTabs() {
  return (
    <Navigator
      tabBarOptions={{
        bounces: true,
        indicatorStyle: {
          backgroundColor: '#f00',
        },
        style: {
          backgroundColor: '#111',
        },
        labelStyle: {
          color: '#ddd',
        },
      }}>
      <Screen name="Favorites" component={makeFavorites} />
      <Screen name="Playlist" component={PlaylistStack} />
      <Screen name="User" component={makeUser} />
    </Navigator>
  )
}
