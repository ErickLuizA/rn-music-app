export interface Music {
  id: string
  snippet: {
    title: string
    thumbnails: {
      high: {
        url: string
      }
    }
  }
}

export interface SearchedMusic {
  id: {
    videoId: string
  }
  snippet: {
    title: string
    thumbnails: {
      high: {
        url: string
      }
    }
  }
}
