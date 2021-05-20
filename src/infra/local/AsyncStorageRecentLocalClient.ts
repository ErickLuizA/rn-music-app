import AsyncStorage from '@react-native-async-storage/async-storage'

import { Music } from '../../domain/entities/Music'
import { IRecentLocalClient } from '../../data/protocols/IRecentLocalClient'

const RECENT = '@RN/RECENT'

export class AsyncStorageRecentLocalClient implements IRecentLocalClient {
  async create(params: Music): Promise<any> {
    const recentMusics = await this.get()

    let filteredArray: Music[] = []

    if (recentMusics.length > 0) {
      filteredArray = recentMusics.filter(m => m.id !== params.id)
    }

    filteredArray.push(params)

    await AsyncStorage.setItem(RECENT, JSON.stringify(filteredArray))
  }

  async get(): Promise<Music[]> {
    const recentJSON = await AsyncStorage.getItem(RECENT)

    if (recentJSON == null) {
      return []
    } else {
      return JSON.parse(recentJSON)
    }
  }
}
