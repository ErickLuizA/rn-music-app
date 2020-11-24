import React from 'react'
import Home from '../../../presentation/screens/Home'
import { makeLoadMusics } from '../useCases/LoadMusicsFactory'

export function makeHome() {
  return <Home loadMusics={makeLoadMusics()} />
}
