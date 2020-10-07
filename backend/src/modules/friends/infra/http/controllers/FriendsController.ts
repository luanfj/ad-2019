import { Request, Response } from 'express'
import { container } from 'tsyringe'

import CreateFriendService from '@modules/friends/services/CreateFriendService'
import ListFriendsService from '@modules/friends/services/ListFriendsService'

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
}
