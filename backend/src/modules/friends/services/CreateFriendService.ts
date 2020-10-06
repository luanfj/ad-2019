import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/AppError'
import IFriendsRepository from '../repositories/IFriendsRepository'
import Friend from '../infra/typeorm/schemas/Friend'

interface IRequest {
  name: string
  email: string
}

@injectable()
export default class CreateFriendService {
  constructor(
    @inject('UsersRepository')
    private friendsRepository: IFriendsRepository
  ) {}

  public async execute({ name, email }: IRequest): Promise<Friend> {
    const checkUserExists = await this.friendsRepository.findByEmail(email)

    if (checkUserExists) {
      throw new AppError('Email address already used.')
    }

    const friend = this.friendsRepository.create({
      name,
      email
    })

    return friend
  }
}
