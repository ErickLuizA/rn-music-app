import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'

import AuthProvider from '../presentation/contexts/AuthContext'
import Navigation from './navigation'

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <Navigation />
      </AuthProvider>
    </NavigationContainer>
  )
}
