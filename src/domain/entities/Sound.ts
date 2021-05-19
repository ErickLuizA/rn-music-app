import { Music } from './Music'

export class Sound {
  id: string
  url: string
  music?: Music

  constructor(id: string, url: string, music?: Music) {
    this.id = id
    this.url = url
    this.music = music
  }

  static fromJson(json: any): Sound {
    return {
      id: json.s,
      url: json.url,
    }
  }
}
