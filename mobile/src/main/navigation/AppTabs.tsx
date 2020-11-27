import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/MaterialIcons'

import { makeHome } from '../factories/screens/HomeFactory'
import { makeSearch } from '../factories/screens/SearchFactory'
import { makeUser } from '../factories/screens/UserFactory'
import UserTabs from './UserTabs'

const { Navigator, Screen } = createBottomTabNavigator()

function AppTabs() {
  return (
    <Navigator
      tabBarOptions={{
        safeAreaInsets: {
          bottom: 5,
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
        component={makeHome}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="music-note" size={size} color={color} />
          ),
          title: 'Música',
        }}
      />

      <Screen
        name="Search"
        component={makeSearch}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="search" size={size} color={color} />
          ),
          title: 'Pesquisar',
        }}
      />

      <Screen
        name="User"
        component={UserTabs}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="person-outline" size={size} color={color} />
          ),
          title: 'Usuário',
        }}
      />
    </Navigator>
  )
}

export default AppTabs
