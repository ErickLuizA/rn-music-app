import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeCreateFavoriteControllerFactory } from '../factories/controllers/Favorites/CreateFavoriteControllerFactory'
import { makeLoadFavoriteControllerFactory } from '../factories/controllers/Favorites/LoadFavoriteControllerFactory'
import { auth } from '../middlewares/auth'

export default (router: Router): void => {
  router.post('/favorite', auth, adaptRoute(makeCreateFavoriteControllerFactory()))
  router.get('/favorites', auth, adaptRoute(makeLoadFavoriteControllerFactory()))
}
