export interface ILocalClient {
  create: (data?: any) => Promise<any>

  load: (param?: any) => Promise<any>
}
