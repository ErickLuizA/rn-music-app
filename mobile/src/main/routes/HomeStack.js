import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import HomeScreen from '../../presentation/screens/Home'
import SearchScreen from '../../presentation/screens/Search'

const { Navigator, Screen } = createStackNavigator()

function HomeStack() {
  return (
    <Navigator initialRouteName="Home">
      <Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Screen
        name="Search"
        component={SearchScreen}
        options={{ headerShown: false }}
      />
    </Navigator>
  )
}

export default HomeStack
