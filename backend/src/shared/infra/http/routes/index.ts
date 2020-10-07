import { Router } from 'express'

import friendsRouter from '@modules/friends/infra/http/routes/friends.routes'
import profileRouter from '@modules/friends/infra/http/routes/profile.routes'
import secretRouter from '@modules/friends/infra/http/routes/secret.routes'

const routes = Router()

routes.use('/friends', friendsRouter)
routes.use('/friends/secret', secretRouter)
routes.use('/profile', profileRouter)

export default routes
