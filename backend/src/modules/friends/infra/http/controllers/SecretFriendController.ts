import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { classToClass } from 'class-transformer'

import CreateSecretFriendService from '@modules/friends/services/CreateSecretFriendService'
import ResetSecretFriendsListService from '@modules/friends/services/ResetSecretFriendsListService'

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

  public async destroy(
    request: Request,
    response: Response
  ): Promise<Response> {
    const resetSecretFriendsList = container.resolve(
      ResetSecretFriendsListService
    )

    const reset = await resetSecretFriendsList.execute()

    return response.json(reset)
  }
}
