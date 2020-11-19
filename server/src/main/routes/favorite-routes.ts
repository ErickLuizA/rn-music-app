import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeCreateFavoriteControllerFactory } from '../factories/controllers/Favorites/CreateFavoriteControllerFactory'
import { makeDeleteFavoriteControllerFactory } from '../factories/controllers/Favorites/DeleteFavoriteControllerFactory'
import { makeLoadFavoriteControllerFactory } from '../factories/controllers/Favorites/LoadFavoriteControllerFactory'
import { auth } from '../middlewares/auth'

export default (router: Router): void => {
  router.post('/favorite', auth, adaptRoute(makeCreateFavoriteControllerFactory()))
  router.get('/favorites', auth, adaptRoute(makeLoadFavoriteControllerFactory()))
  router.delete('/favorite/:id', auth, adaptRoute(makeDeleteFavoriteControllerFactory()))
}
