import React from 'react'
import Register from '../../../presentation/screens/Register'
import { makeCreateUser } from '../useCases/CreateUserFactory'

export function makeRegister() {
  return <Register createUser={makeCreateUser()} />
}
