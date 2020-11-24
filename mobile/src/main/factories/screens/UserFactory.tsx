import React from 'react'
import UserScreen from '../../../presentation/screens/User'
import { makeLoadUser } from '../useCases/LoadUserFactory'

export function makeUser() {
  return <UserScreen loadUser={makeLoadUser()} />
}
