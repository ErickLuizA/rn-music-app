import React from 'react'
import Login from '../../../presentation/screens/Login'
import { makeLoadUser } from '../useCases/LoadUserFactory'

export function makeLogin() {
  return <Login loadUser={makeLoadUser()} />
}
