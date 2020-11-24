import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { AntDesign } from '@expo/vector-icons'

import HomeStack from './HomeStack'

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
            <AntDesign name="home" size={size} color={color} />
          ),
          title: '',
        }}
      />

      {/* <Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="hearto" size={size} color={color} />
          ),
          title: '',
        }}
      />

      <Screen
        name="Ṕlaying"
        component={PlayingScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign
              name="playcircleo"
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
            <AntDesign name="folderopen" size={size} color={color} />
          ),
          title: '',
        }}
      />

      <Screen
        name="User"
        component={UserScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="user" size={size} color={color} />
          ),
          title: '',
        }}
      /> */}
    </Navigator>
  )
}

export default AppTabs
