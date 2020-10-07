import { ObjectID } from 'mongodb'

import FakeSecretFriendsRepository from '../repositories/fakes/FakeSecretFriendRepository'
import ResetSecretFriendsListService from './ResetSecretFriendsListService'

let resetSecretFriendsList: ResetSecretFriendsListService
let fakeSecretFriendsRepository: FakeSecretFriendsRepository

describe('ResetSecretFriendsList', () => {
  beforeEach(() => {
    fakeSecretFriendsRepository = new FakeSecretFriendsRepository()

    resetSecretFriendsList = new ResetSecretFriendsListService(
      fakeSecretFriendsRepository
    )
  })

  it('should be able to delete all secret friends', async () => {
    const emptySecretFriends = jest.spyOn(
      fakeSecretFriendsRepository,
      'deleteAllSecretFriends'
    )

    await fakeSecretFriendsRepository.create({
      friend_id: new ObjectID(),
      secret_friend_id: new ObjectID()
    })

    resetSecretFriendsList.execute()

    expect(emptySecretFriends).toHaveBeenCalled()
  })
})
