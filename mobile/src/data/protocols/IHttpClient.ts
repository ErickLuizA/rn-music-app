export interface IHttpClient {
  post: (url: string, data?: any, params?: any) => Promise<any>

  get: (url: string, data?: any, params?: any) => Promise<any>

  delete: (url: string, data?: any) => Promise<any>
}
