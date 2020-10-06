import { ObjectID } from 'mongodb'

import AppError from '@shared/errors/AppError'
import FakeFriendsRepository from '../repositories/fakes/FakeFriendsRepository'
import UpdateFriendService from './UpdateFriendService'

let updateFriendProfile: UpdateFriendService
let fakeFriendsRepository: FakeFriendsRepository

describe('CreateFriend', () => {
  beforeEach(() => {
    fakeFriendsRepository = new FakeFriendsRepository()

    updateFriendProfile = new UpdateFriendService(fakeFriendsRepository)
  })

  it('should be able to update a friend', async () => {
    const friend = await fakeFriendsRepository.create({
      name: 'John Doe',
      email: 'any@email.com'
    })

    const updatedFriend = await updateFriendProfile.execute({
      friend_id: friend.id,
      name: 'John',
      email: 'any@test.com'
    })

    expect(updatedFriend.name).toBe('John')
    expect(updatedFriend.email).toBe('any@test.com')
  })

  it('should not be able to update an inexistent profile', async () => {
    expect(
      updateFriendProfile.execute({
        friend_id: new ObjectID(),
        name: 'Test',
        email: 'any@email.com'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to update to an existent email', async () => {
    await fakeFriendsRepository.create({
      name: 'John Doe',
      email: 'any@email.com'
    })

    const friend = await fakeFriendsRepository.create({
      name: 'John Doe',
      email: 'any@test.com'
    })

    await expect(
      updateFriendProfile.execute({
        friend_id: friend.id,
        name: 'John',
        email: 'any@email.com'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
