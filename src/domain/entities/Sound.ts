export class Sound {
  id: string
  url: string

  constructor(id: string, url: string) {
    this.id = id
    this.url = url
  }

  static fromJson(json: any): Sound {
    return {
      id: json.s,
      url: json.url,
    }
  }
}
