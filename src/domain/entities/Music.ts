export class Music {
  id: string
  title: string
  image: string
  isFavorite: boolean

  constructor(id: string, title: string, image: string, isFavorite: boolean) {
    this.id = id
    this.title = title
    this.image = image
    this.isFavorite = isFavorite
  }

  static fromJson(json: any): Music {
    return new Music(
      json.id.videoId ?? json.id,
      json.snippet.title,
      json.snippet.thumbnails.default.url,
      false,
    )
  }

  static fromFavorite(fav: any): Music {
    return new Music(fav.favoriteId, fav.title, fav.img, true)
  }

  favorite() {
    this.isFavorite = true
  }

  unFavorite() {
    this.isFavorite = false
  }
}
