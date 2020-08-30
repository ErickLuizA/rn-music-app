import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { AppLoading } from 'expo';
import {
  useFonts,
  Inter_400Regular,
  Inter_700Bold,
} from '@expo-google-fonts/inter';

import AuthProvider from './src/contexts/AuthContext';
import Routes from './src/routes';

export default function App() {
  let [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <NavigationContainer>
      <AuthProvider>
        <StatusBar style="light" backgroundColor="#111" />
        <Routes />
      </AuthProvider>
    </NavigationContainer>
  );
}
