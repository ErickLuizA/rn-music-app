export interface Music {
  id: number
  snippet: {
    title: string
    thumbnails: {
      high: {
        url: string
      }
    }
  }
}
