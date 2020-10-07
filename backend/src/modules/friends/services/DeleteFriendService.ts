import { inject, injectable } from 'tsyringe'
import { ObjectID } from 'mongodb'

import AppError from '@shared/errors/AppError'
import IFriendsRepository from '../repositories/IFriendsRepository'

interface IRequest {
  friend_id: ObjectID
}

@injectable()
export default class DeleteFriendService {
  constructor(
    @inject('FriendsRepository')
    private friendsRepository: IFriendsRepository
  ) {}

  public async execute({ friend_id }: IRequest): Promise<void> {
    const friend = await this.friendsRepository.findById(friend_id)

    if (!friend) {
      throw new AppError('Friend not found.')
    }

    await this.friendsRepository.deleteFriend(friend_id)
  }
}
