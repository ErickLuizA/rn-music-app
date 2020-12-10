import React, { useEffect } from 'react'
import { StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import SplashScreen from 'react-native-splash-screen'

import AuthProvider from '../presentation/contexts/AuthContext'
import Navigation from './navigation'

export default function App() {
  useEffect(() => {
    SplashScreen.hide()
  }, [])

  return (
    <NavigationContainer>
      <AuthProvider>
        <>
          <StatusBar barStyle="light-content" backgroundColor="#111" />
          <Navigation />
        </>
      </AuthProvider>
    </NavigationContainer>
  )
}
