import { ILocalClient } from '../../data/protocols/ILocalClient'
import AsyncStorage from '@react-native-community/async-storage'

export class AsyncStorageClient implements ILocalClient {
  async create(data?: any): Promise<any> {
    return await AsyncStorage.setItem('@RNplayed', JSON.stringify(data))
  }

  async load(param?: any): Promise<any> {
    return await AsyncStorage.getItem(param)
  }
}
