import AppError from '@shared/errors/AppError'
import FakeFriendsRepository from '../repositories/fakes/FakeFriendsRepository'
import CreateFriendService from './CreateFriendService'

let createFriend: CreateFriendService
let fakeFriendsRepository: FakeFriendsRepository

describe('CreateFriend', () => {
  beforeEach(() => {
    fakeFriendsRepository = new FakeFriendsRepository()

    createFriend = new CreateFriendService(fakeFriendsRepository)
  })

  it('should be able to create a new friend', async () => {
    const friend = await createFriend.execute({
      name: 'John Doe',
      email: 'any@email.com'
    })

    expect(friend).toHaveProperty('id')
  })

  it('should not be able to create a new friend with same email from another', async () => {
    await createFriend.execute({
      name: 'John Doe',
      email: 'any@email.com'
    })

    await expect(
      createFriend.execute({
        name: 'John Doe',
        email: 'any@email.com'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
