import { IRecentLocalClient } from '../../data/protocols/IRecentLocalClient'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Music } from '../../domain/entities/Music'

const RECENT = '@RN/RECENT'

export class AsyncStorageRecentLocalClient implements IRecentLocalClient {
  async create(params: Music): Promise<any> {
    const recentMusics = await this.get()

    const newArray = recentMusics.push(params)

    await AsyncStorage.setItem(RECENT, JSON.stringify(newArray))
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
