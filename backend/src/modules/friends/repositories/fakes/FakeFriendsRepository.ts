import { uuid } from 'uuidv4'

import ICreateFriendDTO from '@modules/friends/dtos/ICreateFriendDTO'
import Friend from '@modules/friends/infra/typeorm/entities/Friend'
import IFriendsRepository from '../IFriendsRepository'

export default class FakeFriendsRepository implements IFriendsRepository {
  private friends: Friend[] = []

  public async create(userData: ICreateFriendDTO): Promise<Friend> {
    const friend = new Friend()

    Object.assign(friend, { id: uuid(), ...userData })

    this.friends.push(friend)

    return friend
  }

  public async findByEmail(email: string): Promise<Friend | undefined> {
    const findFriend = this.friends.find(friend => friend.email === email)

    return findFriend
  }
}
