export interface IHttpClient {
  post: (url: string, data?: any, params?: any) => Promise<any>

  get: (url: string, data?: any, params?: any) => Promise<any>
}
