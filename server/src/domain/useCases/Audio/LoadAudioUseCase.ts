export interface LoadAudioUseCase<T> {
  execute: (id: string) => Promise<T[]>
}
