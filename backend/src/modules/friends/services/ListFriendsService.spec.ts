import FakeFriendsRepository from '../repositories/fakes/FakeFriendsRepository'
import ListFriendsService from './ListFriendsService'

let listFriends: ListFriendsService
let fakeFriendsRepository: FakeFriendsRepository

describe('ListFriends', () => {
  beforeEach(() => {
    fakeFriendsRepository = new FakeFriendsRepository()

    listFriends = new ListFriendsService(fakeFriendsRepository)
  })

  it('should be able to list all the friends', async () => {
    const friend = await fakeFriendsRepository.create({
      name: 'John Doe',
      email: 'any@test.com'
    })

    const friend2 = await fakeFriendsRepository.create({
      name: 'John Trê',
      email: 'any@test.com'
    })

    const friends = await listFriends.execute()

    expect(friends).toEqual([friend, friend2])
  })
})
