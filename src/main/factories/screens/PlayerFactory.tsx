import React from 'react'
import Player from '../../../presentation/screens/Player'
import { makeLoadSound } from '../useCases/LoadSoundFactory'

export function makePlayer() {
  return <Player loadSound={makeLoadSound()} />
}
