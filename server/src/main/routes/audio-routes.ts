import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeLoadAudioController } from '../factories/controllers/Audio/LoadAudioControllerFactory'
import { auth } from '../middlewares/auth'

export default (router: Router): void => {
  router.get('/audio/:id', auth, adaptRoute(makeLoadAudioController()))
}
