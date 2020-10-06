import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/AppError'
import IFriendsRepository from '../repositories/IFriendsRepository'
import ISecretFriendsRepository from '../repositories/ISecretFriendsRepository'
import ICreateSecretFriendDTO from '../dtos/ICreateSecretFriendDTO'

@injectable()
export default class CreateSecretFriendService {
  constructor(
    @inject('FriendsRepository')
    private friendsRepository: IFriendsRepository,

    @inject('SecretFriendsRepository')
    private secretFriendsRepository: ISecretFriendsRepository
  ) {}

  public async execute({
    friend_id,
    secret_friend_id
  }: ICreateSecretFriendDTO): Promise<void> {
    const friend = this.friendsRepository.findById(friend_id)
    const secret_friend = this.friendsRepository.findById(secret_friend_id)

    if (!friend) {
      throw new AppError('Friend does not exists.')
    }

    if (!secret_friend) {
      throw new AppError('Secret Friend does not exists.')
    }

    await this.secretFriendsRepository.create({
      friend_id,
      secret_friend_id
    })
  }
}
