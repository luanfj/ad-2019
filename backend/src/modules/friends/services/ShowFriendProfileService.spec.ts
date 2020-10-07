import { ObjectID } from 'mongodb'

import AppError from '@shared/errors/AppError'
import FakeFriendsRepository from '../repositories/fakes/FakeFriendsRepository'
import ShowFriendProfileService from './ShowFriendProfileService'

let showFriendProfile: ShowFriendProfileService
let fakeFriendsRepository: FakeFriendsRepository

describe('ShowFriendProfile', () => {
  beforeEach(() => {
    fakeFriendsRepository = new FakeFriendsRepository()

    showFriendProfile = new ShowFriendProfileService(fakeFriendsRepository)
  })

  it('should be able to show friend profile', async () => {
    const friend = await fakeFriendsRepository.create({
      name: 'John Doe',
      email: 'any@email.com'
    })

    const profile = await showFriendProfile.execute({
      friend_id: friend.id
    })

    expect(profile.name).toBe('John Doe')
    expect(profile.email).toBe('any@email.com')
  })

  it('should not be able to show a inexistent', async () => {
    await expect(
      showFriendProfile.execute({
        friend_id: new ObjectID()
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
