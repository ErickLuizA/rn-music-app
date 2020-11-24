import React from 'react'
import Login from '../../../presentation/screens/Login'
import { makeLoginUser } from '../useCases/LoginUserFactory'

export function makeLogin() {
  return <Login loginUser={makeLoginUser()} />
}
