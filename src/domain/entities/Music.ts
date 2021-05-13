export class Music {
  id: string
  title: string
  image: string

  constructor(id: string, title: string, image: string) {
    this.id = id
    this.title = title
    this.image = image
  }

  static fromJson(json: any): Music {
    return {
      id: json.id.videoId ?? json.id,
      title: json.snippet.title,
      image: json.snippet.thumbnails.default.url,
    }
  }
}
