import { injectable, inject } from 'tsyringe'
import path from 'path'

import AppError from '@shared/errors/AppError'
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider'
import IFriendsRepository from '../repositories/IFriendsRepository'
import ISecretFriendsRepository from '../repositories/ISecretFriendsRepository'
import ICreateSecretFriendDTO from '../dtos/ICreateSecretFriendDTO'

@injectable()
export default class CreateSecretFriendService {
  constructor(
    @inject('FriendsRepository')
    private friendsRepository: IFriendsRepository,

    @inject('SecretFriendsRepository')
    private secretFriendsRepository: ISecretFriendsRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider
  ) {}

  public async execute({
    friend_id,
    secret_friend_id
  }: ICreateSecretFriendDTO): Promise<void> {
    const friend = await this.friendsRepository.findById(friend_id)
    const secret_friend = await this.friendsRepository.findById(
      secret_friend_id
    )
    const checkFriendAlreadyHasASecret = await this.secretFriendsRepository.findFriendById(
      friend_id
    )
    const checkSecretAlreadyHasAFriend = await this.secretFriendsRepository.findSecretById(
      secret_friend_id
    )

    if (!friend) {
      throw new AppError('Friend does not exists.')
    }

    if (!secret_friend) {
      throw new AppError('Secret Friend does not exists.')
    }

    if (friend_id === secret_friend_id) {
      throw new AppError('Friend can not be the same secret friend')
    }

    if (checkFriendAlreadyHasASecret) {
      throw new AppError('This friend already has a secret')
    }

    if (checkSecretAlreadyHasAFriend) {
      throw new AppError('This secret already has a friend')
    }

    await this.secretFriendsRepository.create({
      friend_id,
      secret_friend_id
    })

    const secretFriendTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'secret_friend.hbs'
    )

    await this.mailProvider.sendMail({
      to: {
        name: friend.name,
        email: friend.email
      },
      subject: '[AmigoSecreto] Você tem um amigo secreto!',
      templateData: {
        file: secretFriendTemplate,
        variables: {
          friend: friend.name,
          secret: secret_friend.name
        }
      }
    })
  }
}
