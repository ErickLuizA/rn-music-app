import 'react-native-gesture-handler'
import React from 'react'
import { StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'

import AuthProvider from '../presentation/contexts/AuthContext'
import PlayingProvider from '../presentation/contexts/PlayingContext'

import Navigation from './navigation'

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <PlayingProvider>
          <>
            <StatusBar backgroundColor="#111" barStyle="light-content" />
            <Navigation />
          </>
        </PlayingProvider>
      </AuthProvider>
    </NavigationContainer>
  )
}
