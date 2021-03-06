import { ObjectID } from 'mongodb'

import ICreateFriendDTO from '../dtos/ICreateFriendDTO'
import Friend from '../infra/typeorm/schemas/Friend'

export default interface IFriendsRepository {
  create(data: ICreateFriendDTO): Promise<Friend>
  findByEmail(email: string): Promise<Friend | undefined>
  findById(id: ObjectID): Promise<Friend | undefined>
  save(friend: Friend): Promise<Friend>
  findAllFriends(): Promise<Friend[]>
  deleteFriend(id: ObjectID): Promise<void>
}
