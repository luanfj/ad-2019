import { ObjectID } from 'mongodb'

import ICreateSecretFriendDTO from '../dtos/ICreateSecretFriendDTO'
import SecretFriend from '../infra/typeorm/schemas/SecretFriend'

export default interface ISecretFriendsRepository {
  create(data: ICreateSecretFriendDTO): Promise<SecretFriend>
  findFriendById(id: ObjectID): Promise<SecretFriend | undefined>
  findSecretById(id: ObjectID): Promise<SecretFriend | undefined>
}
