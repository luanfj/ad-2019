import FakeFriendsRepository from '../repositories/fakes/FakeFriendsRepository'
import FakeSecretFriendsRepository from '../repositories/fakes/FakeSecretFriendsRepository'
import CreateSecretFriendService from './CreateSecretFriendService'

let fakeFriendsRepository: FakeFriendsRepository
let fakeSecretFriendsRepository: FakeSecretFriendsRepository
let createSecretFriend: CreateSecretFriendService

describe('CreateSecretFriend', () => {
  beforeEach(() => {
    fakeFriendsRepository = new FakeFriendsRepository()
    fakeSecretFriendsRepository = new FakeSecretFriendsRepository()

    createSecretFriend = new CreateSecretFriendService(
      fakeFriendsRepository,
      fakeSecretFriendsRepository
    )
  })

  it('should be able to create a secret friend', async () => {
    const secretFriend = jest.spyOn(fakeSecretFriendsRepository, 'create')

    const friend = await fakeFriendsRepository.create({
      name: 'John Doe',
      email: 'any@email.com'
    })

    const friend2 = await fakeFriendsRepository.create({
      name: 'John Doe',
      email: 'any@email.com'
    })

    await createSecretFriend.execute({
      friend_id: friend.id,
      secret_friend_id: friend2.id
    })

    expect(secretFriend).toHaveBeenCalledWith({
      friend_id: friend.id,
      secret_friend_id: friend2.id
    })
  })
})
