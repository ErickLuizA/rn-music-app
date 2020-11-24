import React from 'react'
import Home from '../../../presentation/screens/Home'
import { makeLoadMusics } from '../useCases/LoadMusicsFactory'
import { makeLoadRecent } from '../useCases/LoadRecentFactory'

export function makeHome() {
  return <Home loadRecent={makeLoadRecent()} loadMusics={makeLoadMusics()} />
}
