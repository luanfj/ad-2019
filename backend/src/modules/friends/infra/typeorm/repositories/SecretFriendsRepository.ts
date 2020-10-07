import { MongoRepository, getMongoRepository } from 'typeorm'
import { ObjectID } from 'mongodb'

import ISecretFriendsRepository from '@modules/friends/repositories/ISecretFriendsRepository'
import ICreateSecretFriendDTO from '@modules/friends/dtos/ICreateSecretFriendDTO'
import SecretFriend from '../schemas/SecretFriend'

export default class SecretFriendsRepository
  implements ISecretFriendsRepository {
  private ormRepository: MongoRepository<SecretFriend>

  constructor() {
    this.ormRepository = getMongoRepository(SecretFriend)
  }

  public async create({
    friend_id,
    secret_friend_id
  }: ICreateSecretFriendDTO): Promise<SecretFriend> {
    const secretFriend = this.ormRepository.create({
      friend_id,
      secret_friend_id
    })

    await this.ormRepository.save(secretFriend)

    return secretFriend
  }

  public async findFriendById(id: ObjectID): Promise<SecretFriend | undefined> {
    const findSecret = this.ormRepository.findOne({
      where: {
        friend_id: id
      }
    })

    return findSecret
  }

  public async findSecretById(id: ObjectID): Promise<SecretFriend | undefined> {
    const findSecret = this.ormRepository.findOne({
      where: {
        secret_friend_id: id
      }
    })

    return findSecret
  }

  public async deleteAllSecretFriends(): Promise<void> {
    await this.ormRepository.clear()
  }
}
