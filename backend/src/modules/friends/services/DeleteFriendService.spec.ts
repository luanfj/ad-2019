import { ObjectID } from 'mongodb'

import AppError from '@shared/errors/AppError'
import FakeFriendsRepository from '../repositories/fakes/FakeFriendsRepository'
import DeleteFriendService from './DeleteFriendService'

let deleteFriend: DeleteFriendService
let fakeFriendsRepository: FakeFriendsRepository

describe('DeleteFriend', () => {
  beforeEach(() => {
    fakeFriendsRepository = new FakeFriendsRepository()

    deleteFriend = new DeleteFriendService(fakeFriendsRepository)
  })

  it('should be able to delete friend', async () => {
    const deleteFriendSpy = jest.spyOn(fakeFriendsRepository, 'deleteFriend')

    const friend = await fakeFriendsRepository.create({
      name: 'John Doe',
      email: 'any@email.com'
    })

    await deleteFriend.execute({ friend_id: friend.id })

    expect(deleteFriendSpy).toHaveBeenCalled()
  })

  it('should not be able to delete a inexistent friend', async () => {
    await expect(
      deleteFriend.execute({
        friend_id: new ObjectID()
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
