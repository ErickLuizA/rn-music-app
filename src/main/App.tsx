import 'react-native-gesture-handler'
import React from 'react'
import { StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'

import AuthProvider from '../presentation/contexts/AuthContext'
import Navigation from './navigation'

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <>
          <StatusBar backgroundColor="#111" barStyle="light-content" />
          <Navigation />
        </>
      </AuthProvider>
    </NavigationContainer>
  )
}
