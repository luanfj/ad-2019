import { injectable, inject } from 'tsyringe'
import { ObjectID } from 'mongodb'

import AppError from '@shared/errors/AppError'
import IFriendsRepository from '../repositories/IFriendsRepository'
import Friend from '../infra/typeorm/entities/Friend'

interface IRequest {
  friend_id: ObjectID
  name: string
  email: string
}

@injectable()
export default class UpdateFriendService {
  constructor(
    @inject('FriendsRepository')
    private friendsRepository: IFriendsRepository
  ) {}

  public async execute({ friend_id, name, email }: IRequest): Promise<Friend> {
    const friend = await this.friendsRepository.findById(friend_id)

    if (!friend) {
      throw new AppError('Friend not found.')
    }

    friend.name = name
    friend.email = email

    return this.friendsRepository.save(friend)
  }
}
