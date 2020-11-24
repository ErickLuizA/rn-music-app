import React, { useContext } from 'react'
import { AuthContext } from '../../presentation/contexts/AuthContext'

import AuthNavigation from './Auth'
import AppNavigation from './AppTabs'

function Navigation() {
  const { authenticated } = useContext(AuthContext)

  return authenticated ? <AppNavigation /> : <AuthNavigation />
}

export default Navigation
