import { getMongoRepository, MongoRepository } from 'typeorm'
import { ObjectID } from 'mongodb'

import IFriendsRepository from '@modules/friends/repositories/IFriendsRepository'
import ICreateFriendDTO from '@modules/friends/dtos/ICreateFriendDTO'
import Friend from '../schemas/Friend'

export default class FriendsRepository implements IFriendsRepository {
  private ormRepository: MongoRepository<Friend>

  constructor() {
    this.ormRepository = getMongoRepository(Friend)
  }

  public async create(userData: ICreateFriendDTO): Promise<Friend> {
    const friend = this.ormRepository.create(userData)

    await this.ormRepository.save(friend)

    return friend
  }

  public async findByEmail(email: string): Promise<Friend | undefined> {
    const friend = await this.ormRepository.findOne({
      where: { email }
    })

    return friend
  }

  public async findById(id: ObjectID): Promise<Friend | undefined> {
    const friend = await this.ormRepository.findOne({
      where: { _id: id }
    })

    return friend
  }

  public async save(friend: Friend): Promise<Friend> {
    return this.ormRepository.save(friend)
  }

  public async findAllFriends(): Promise<Friend[]> {
    const friends = await this.ormRepository.find()

    return friends
  }

  public async deleteFriend(id: ObjectID): Promise<void> {
    await this.ormRepository.findOneAndDelete({ _id: id })
  }
}
