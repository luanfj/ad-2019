import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ObjectID } from 'mongodb'

import UpdateFriendService from '@modules/friends/services/UpdateFriendService'
import ShowFriendProfileService from '@modules/friends/services/ShowFriendProfileService'
import DeleteFriendService from '@modules/friends/services/DeleteFriendService'

export default class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const showFriendProfile = container.resolve(ShowFriendProfileService)

    const { friendId } = request.params

    const friend = await showFriendProfile.execute({
      friend_id: new ObjectID(friendId)
    })

    return response.json(friend)
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body
    const { friendId } = request.params

    const updateFriendProfile = container.resolve(UpdateFriendService)

    const friend = await updateFriendProfile.execute({
      friend_id: new ObjectID(friendId),
      name,
      email
    })

    return response.json(friend)
  }

  public async destroy(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { friendId } = request.params

    const deleteFriend = container.resolve(DeleteFriendService)

    const deleteData = await deleteFriend.execute({
      friend_id: new ObjectID(friendId)
    })

    return response.json(deleteData)
  }
}
