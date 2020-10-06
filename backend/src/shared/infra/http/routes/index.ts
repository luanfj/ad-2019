import { Router } from 'express'

import friendsRouter from '@modules/friends/infra/http/routes/friends.routes'

const routes = Router()

routes.use('/friends', friendsRouter)

export default routes
