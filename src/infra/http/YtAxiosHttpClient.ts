import { IHttpClient } from '../../data/protocols/IHttpClient'
import youtubeApi from '../services/youtube-api'

export class AxiosHttpClient implements IHttpClient {
  async post(url: string, data?: any): Promise<any> {
    return await (
      await youtubeApi.post(url, data)
    ).data
  }

  async get(url: string, data?: any, params?: any): Promise<any> {
    return await (
      await youtubeApi.get(url, {
        params,
        data,
      })
    ).data
  }

  async update(url: string, data?: any, params?: any): Promise<any> {
    return await (
      await youtubeApi.patch(url, {
        params,
        data,
      })
    ).data
  }

  async delete(url: string, data?: any): Promise<any> {
    return await (
      await youtubeApi.delete(url, data)
    ).data
  }
}
