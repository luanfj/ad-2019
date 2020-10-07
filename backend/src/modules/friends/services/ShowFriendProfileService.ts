import { injectable, inject } from 'tsyringe'
import { ObjectID } from 'mongodb'

import AppError from '@shared/errors/AppError'
import IFriendsRepository from '../repositories/IFriendsRepository'
import Friend from '../infra/typeorm/schemas/Friend'

interface IRequest {
  friend_id: ObjectID
}

@injectable()
export default class ShowFriendProfileService {
  constructor(
    @inject('FriendsRepository')
    private friendsRepository: IFriendsRepository
  ) {}

  public async execute({ friend_id }: IRequest): Promise<Friend> {
    const friend = await this.friendsRepository.findById(friend_id)

    if (!friend) {
      throw new AppError('Friend not found.')
    }

    return friend
  }
}
