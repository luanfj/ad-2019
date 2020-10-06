import { Router } from 'express'
import { celebrate, Segments, Joi } from 'celebrate'

import FriendsController from '../controllers/FriendsController'
import SecretFriendController from '../controllers/SecretFriendController'

const friendsRouter = Router()
const friendsController = new FriendsController()
const secretFriendController = new SecretFriendController()

friendsRouter.get('/', friendsController.index)

friendsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required()
    }
  }),
  friendsController.create
)

friendsRouter.post(
  '/secret',
  celebrate({
    [Segments.BODY]: {
      friend_id: Joi.required(),
      secret_friend_id: Joi.required()
    }
  }),
  secretFriendController.create
)

friendsRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      friend_id: Joi.required(),
      name: Joi.string().required(),
      email: Joi.string().required()
    }
  }),
  friendsController.update
)

export default friendsRouter
