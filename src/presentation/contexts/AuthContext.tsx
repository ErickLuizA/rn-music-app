import React, { createContext, useState, useEffect, ReactChild } from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import api from '../../infra/services/api'

interface IAuthContext {
  authenticated: boolean
  login: (response: any) => Promise<void>
  logout: () => Promise<void>
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext)

interface IAuthProvider {
  children: ReactChild
}

function AuthProvider({ children }: IAuthProvider) {
  const [authenticated, setAuthenticated] = useState(false)

  useEffect(() => {
    async function checkAuth() {
      const token = await AsyncStorage.getItem('@RNtoken')

      if (token) {
        setAuthenticated(true)
        api.defaults.headers.Authorization = `Bearer ${token}`
      } else {
        setAuthenticated(false)
        api.defaults.headers.Authorization = `Bearer ${undefined}`
      }
    }

    checkAuth()
  }, [authenticated])

  const login = async (response: any) => {
    setAuthenticated(true)

    await AsyncStorage.setItem('@RNtoken', response.accessToken)
  }

  const logout = async () => {
    setAuthenticated(false)

    await AsyncStorage.removeItem('@RNtoken')
  }

  return (
    <AuthContext.Provider value={{ authenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
