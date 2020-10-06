import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { classToClass } from 'class-transformer'

import CreateSecretFriendService from '@modules/friends/services/CreateSecretFriendService'

export default class SecretFriendController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { friend_id, secret_friend_id } = request.body

    const createSecretFriend = container.resolve(CreateSecretFriendService)

    const secretFriend = await createSecretFriend.execute({
      friend_id,
      secret_friend_id
    })

    return response.json(classToClass(secretFriend))
  }
}
