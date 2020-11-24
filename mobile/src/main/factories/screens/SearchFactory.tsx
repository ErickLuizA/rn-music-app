import React from 'react'
import SearchScreen from '../../../presentation/screens/Search'
import { makeSearchMusics } from '../useCases/SearchMusicsFactory'

export function makeSearch() {
  return <SearchScreen searchMusic={makeSearchMusics()} />
}
