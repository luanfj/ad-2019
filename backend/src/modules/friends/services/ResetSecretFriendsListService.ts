import { inject, injectable } from 'tsyringe'

import ISecretFriendsRepository from '../repositories/ISecretFriendsRepository'

@injectable()
export default class ResetSecretFriendsListService {
  constructor(
    @inject('SecretFriendsRepository')
    private secretFriendsRepository: ISecretFriendsRepository
  ) {}

  public async execute(): Promise<void> {
    await this.secretFriendsRepository.deleteAllSecretFriends()
  }
}
