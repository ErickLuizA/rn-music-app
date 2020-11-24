import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { makeRegister } from '../factories/screens/RegisterFactory'
import { makeLogin } from '../factories/screens/LoginFactory'

const { Screen, Navigator } = createStackNavigator()

function AuthRoutes() {
  return (
    <Navigator>
      <Screen
        name="Login"
        component={makeLogin}
        options={{ headerShown: false }}
      />
      <Screen
        name="Register"
        component={makeRegister}
        options={{ headerShown: false }}
      />
    </Navigator>
  )
}

export default AuthRoutes
