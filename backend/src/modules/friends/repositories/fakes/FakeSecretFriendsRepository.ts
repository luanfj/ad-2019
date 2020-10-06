import { ObjectID } from 'mongodb'

import ICreateSecretFriendDTO from '@modules/friends/dtos/ICreateSecretFriendDTO'
import SecretFriend from '@modules/friends/infra/typeorm/schemas/SecretFriend'
import ISecretFriendsRepository from '../ISecretFriendsRepository'

export default class FakeSecretFriendsRepository
  implements ISecretFriendsRepository {
  private secretFriends: SecretFriend[] = []

  public async create(data: ICreateSecretFriendDTO): Promise<SecretFriend> {
    const secretFriend = new SecretFriend()

    Object.assign(secretFriend, {
      id: new ObjectID(),
      ...data,
      created_at: new Date(),
      updated_at: new Date()
    })

    this.secretFriends.push(secretFriend)

    return secretFriend
  }
}
