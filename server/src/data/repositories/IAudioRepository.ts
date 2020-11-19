export interface IAudioRepository<T> {
  load: (id: string) => Promise<T[]>
}
