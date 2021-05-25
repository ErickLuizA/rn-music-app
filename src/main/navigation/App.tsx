import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/MaterialIcons'

import { makeSearch } from '../factories/screens/SearchFactory'
import { makeHome } from '../factories/screens/HomeFactory'
import { makePlayer } from '../factories/screens/PlayerFactory'

import UserTabs from './UserTabs'

const StackNavigator = createStackNavigator()

function App() {
  return (
    <StackNavigator.Navigator initialRouteName="BottomTabs">
      <StackNavigator.Screen
        name="BottomTabs"
        children={BottomTabs}
        options={{
          headerShown: false,
        }}
      />
      <StackNavigator.Screen
        name="Player"
        children={makePlayer}
        options={{
          headerShown: false,
        }}
      />
    </StackNavigator.Navigator>
  )
}

const { Navigator, Screen } = createBottomTabNavigator()

function BottomTabs() {
  return (
    <Navigator
      tabBarOptions={{
        safeAreaInsets: {
          bottom: 5,
        },
        style: {
          backgroundColor: '#131418',
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

export default App
