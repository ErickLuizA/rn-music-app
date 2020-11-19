import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { auth } from '../middlewares/auth'
import { makeCreatePlaylistControllerFactory } from '../factories/controllers/Playlist/CreatePlaylistControllerFactory'
import { makeCreatePlaylistMusicControllerFactory } from '../factories/controllers/Playlist/CreatePlaylistMusicControllerFactory'
import { makeDeletePlaylistControllerFactory } from '../factories/controllers/Playlist/DeletePlaylistControllerFactory'
import { makeDeletePlaylistMusicControllerFactory } from '../factories/controllers/Playlist/DeletePlaylistMusicControllerFactory'
import { makeLoadPlaylistControllerFactory } from '../factories/controllers/Playlist/LoadPlaylistControllerFactory'
import { makeLoadPlaylistsControllerFactory } from '../factories/controllers/Playlist/LoadPlaylistsControllerFactory'
import { makeUpdatePlaylistControllerFactory } from '../factories/controllers/Playlist/UpdatePlaylistControllerFactory'

export default (router: Router): void => {
  router.get('/playlists', auth, adaptRoute(makeLoadPlaylistsControllerFactory()))
  router.post('/playlist', auth, adaptRoute(makeCreatePlaylistControllerFactory()))
  router.patch('/playlist', auth, adaptRoute(makeUpdatePlaylistControllerFactory()))
  router.delete('/playlist/:id', auth, adaptRoute(makeDeletePlaylistControllerFactory()))

  router.post('/playlist_music', auth, adaptRoute(makeCreatePlaylistMusicControllerFactory()))
  router.get('/playlist_musics/:id', auth, adaptRoute(makeLoadPlaylistControllerFactory()))
  router.delete('/playlist_music', auth, adaptRoute(makeDeletePlaylistMusicControllerFactory())
  )
}
