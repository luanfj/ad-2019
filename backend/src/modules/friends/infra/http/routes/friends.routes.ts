import { Router } from 'express'
import { celebrate, Segments, Joi } from 'celebrate'

import FriendsController from '../controllers/FriendsController'

const friendsRouter = Router()
const friendsController = new FriendsController()

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

export default friendsRouter
