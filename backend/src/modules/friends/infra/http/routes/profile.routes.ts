import { Router } from 'express'
import { celebrate, Segments, Joi } from 'celebrate'

import ProfileController from '../controllers/ProfileController'

const profileRouter = Router()
const profileController = new ProfileController()

profileRouter.get('/:friendId', profileController.show)

profileRouter.put(
  '/:friendId',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().required()
    }
  }),
  profileController.update
)

profileRouter.delete('/:friendId', profileController.destroy)

export default profileRouter
