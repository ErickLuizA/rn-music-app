import React from 'react'
import Register from '../../../presentation/screens/Register'
import { makeCreateUser } from '../useCases/CreateUserFactory'
import { makeLoginUser } from '../useCases/LoginUserFactory'

export function makeRegister() {
  return <Register createUser={makeCreateUser()} loginUser={makeLoginUser()} />
}
