import React, { useContext } from 'react'
import { AuthContext } from '../../presentation/contexts/AuthContext'

import AuthRoutes from './Auth.routes'
import AppRoutes from './AppTabs.routes'

function Routes() {
  const { authenticated } = useContext(AuthContext)

  return authenticated ? <AppRoutes /> : <AuthRoutes />
}

export default Routes
