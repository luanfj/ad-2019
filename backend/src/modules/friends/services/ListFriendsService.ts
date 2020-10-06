import { injectable, inject } from 'tsyringe'

import IFriendsRepository from '../repositories/IFriendsRepository'
import Friend from '../infra/typeorm/schemas/Friend'

@injectable()
export default class ListFriendsService {
  constructor(
    @inject('FriendsRepository')
    private friendsRepository: IFriendsRepository
  ) {}

  public async execute(): Promise<Friend[]> {
    const friends = await this.friendsRepository.findAllFriends()

    return friends
  }
}
