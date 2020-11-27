import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/MaterialIcons'

import HomeStack from './HomeStack'
import PlaylistStack from './PlaylistStack'
import { makeUser } from '../factories/screens/UserFactory'
import { makeFavorites } from '../factories/screens/FavoritesFactory'
import { makePlaying } from '../factories/screens/PlayingFactory'

const { Navigator, Screen } = createBottomTabNavigator()

function AppTabs() {
  return (
    <Navigator
      tabBarOptions={{
        safeAreaInsets: {
          bottom: 0,
        },
        style: {
          backgroundColor: '#131418',
          height: 64,
          borderTopColor: 'transparent',
        },
        iconStyle: {
          flex: 0,
          width: 50,
          height: 20,
        },
        activeTintColor: '#fff',
        inactiveTintColor: '#92929c',
      }}>
      <Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" size={size} color={color} />
          ),
          title: '',
        }}
      />

      <Screen
        name="Favorites"
        component={makeFavorites}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="favorite-border" size={size} color={color} />
          ),
          title: '',
        }}
      />

      <Screen
        name="Playing"
        component={makePlaying}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon
              name="music-note"
              size={size + 20}
              color={color}
              style={{ marginBottom: 20 }} // eslint-disable-line react-native/no-inline-styles
            />
          ),
          title: '',
        }}
      />

      <Screen
        name="Playlist"
        component={PlaylistStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="mail" size={size} color={color} />
          ),
          title: '',
        }}
      />
      <Screen
        name="User"
        component={makeUser}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="person-outline" size={size} color={color} />
          ),
          title: '',
        }}
      />
    </Navigator>
  )
}

export default AppTabs
