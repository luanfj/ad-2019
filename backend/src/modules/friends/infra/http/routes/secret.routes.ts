import { Router } from 'express'
import { celebrate, Segments, Joi } from 'celebrate'

import SecretFriendController from '../controllers/SecretFriendController'

const friendsRouter = Router()
const secretFriendController = new SecretFriendController()

friendsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      friend_id: Joi.required(),
      secret_friend_id: Joi.required()
    }
  }),
  secretFriendController.create
)

friendsRouter.delete('/', secretFriendController.destroy)

export default friendsRouter
