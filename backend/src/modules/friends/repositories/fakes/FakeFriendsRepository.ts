import { ObjectID } from 'mongodb'

import ICreateFriendDTO from '@modules/friends/dtos/ICreateFriendDTO'
import Friend from '@modules/friends/infra/typeorm/schemas/Friend'
import IFriendsRepository from '../IFriendsRepository'

export default class FakeFriendsRepository implements IFriendsRepository {
  private friends: Friend[] = []

  public async create(userData: ICreateFriendDTO): Promise<Friend> {
    const friend = new Friend()

    Object.assign(friend, {
      id: new ObjectID(),
      ...userData,
      created_at: new Date(),
      updated_at: new Date()
    })

    this.friends.push(friend)

    return friend
  }

  public async findByEmail(email: string): Promise<Friend | undefined> {
    const findFriend = this.friends.find(friend => friend.email === email)

    return findFriend
  }

  public async findById(id: ObjectID): Promise<Friend | undefined> {
    const findFriend = this.friends.find(friend => friend.id === id)

    return findFriend
  }

  public async save(friend: Friend): Promise<Friend> {
    const findIndex = this.friends.findIndex(
      findFriend => findFriend.id === friend.id
    )

    this.friends[findIndex] = friend

    return friend
  }

  public async findAllFriends(): Promise<Friend[]> {
    return this.friends
  }

  public async deleteFriend(id: ObjectID): Promise<void> {
    const findIndex = this.friends.findIndex(findFriend => findFriend.id === id)

    this.friends.splice(findIndex, 1)
  }
}
