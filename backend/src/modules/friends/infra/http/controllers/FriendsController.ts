import { Request, Response } from 'express'
import { container } from 'tsyringe'

import CreateFriendService from '@modules/friends/services/CreateFriendService'
import ListFriendsService from '@modules/friends/services/ListFriendsService'
import UpdateFriendService from '@modules/friends/services/UpdateFriendService'

export default class FriendsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listFriends = container.resolve(ListFriendsService)

    const friends = await listFriends.execute()

    return response.json(friends)
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body

    const createFriend = container.resolve(CreateFriendService)

    const friend = await createFriend.execute({
      name,
      email
    })

    return response.json(friend)
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { friend_id, name, email } = request.body

    const updateFriendProfile = container.resolve(UpdateFriendService)

    const friend = await updateFriendProfile.execute({
      friend_id,
      name,
      email
    })

    return response.json(friend)
  }
}
