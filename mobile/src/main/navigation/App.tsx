import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { makePlayer } from '../factories/screens/PlayerFactory'
import AppTabs from './AppTabs'

const { Navigator, Screen } = createStackNavigator()

function AppNavigation() {
  return (
    <Navigator initialRouteName="Tabs">
      <Screen
        name="Tabs"
        component={AppTabs}
        options={{ headerShown: false }}
      />
      <Screen
        name="Player"
        component={makePlayer}
        options={{ headerShown: false }}
      />
    </Navigator>
  )
}

export default AppNavigation
