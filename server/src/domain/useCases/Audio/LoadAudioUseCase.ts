import { videoFormat } from 'ytdl-core'

export interface LoadAudioUseCase {
  execute: (id: number) => Promise<videoFormat>
}
