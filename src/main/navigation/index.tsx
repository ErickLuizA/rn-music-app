import React, { useContext } from 'react'

import { AuthContext } from '../../presentation/contexts/AuthContext'

import AuthNavigation from './Auth'
import AppNavigation from './App'

function Navigation() {
  const { authenticated } = useContext(AuthContext)

  return authenticated ? <AppNavigation /> : <AuthNavigation />
}

export default Navigation
