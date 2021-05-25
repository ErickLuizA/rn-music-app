import { IHttpClient } from '../../data/protocols/IHttpClient'
import api from '../services/api'

export class AxiosHttpClient implements IHttpClient {
  async post(url: string, data?: any): Promise<any> {
    return await (
      await api.post(url, data)
    ).data
  }

  async get(url: string, data?: any, params?: any): Promise<any> {
    return await (
      await api.get(url, {
        params,
        data,
      })
    ).data
  }

  async update(url: string, data?: any, params?: any): Promise<any> {
    return await (
      await api.patch(url, {
        params,
        data,
      })
    ).data
  }

  async delete(url: string, data?: any): Promise<any> {
    return await (
      await api.delete(url, data)
    ).data
  }
}
