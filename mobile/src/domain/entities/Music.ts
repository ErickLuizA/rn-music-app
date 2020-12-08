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

export interface SearchedData {
  id: {
    videoId: string
  }
  img: string
  title: string
}

export interface PlayingMusic {
  id: string
  img: string
  title: string
  url: string
}

export interface PlaylistMusic {
  playlistId: string
  musicId: string
  playlistMusicId: string
  img: string
  title: string
}
