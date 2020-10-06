import AppError from '@shared/errors/AppError'
import { ObjectID } from 'mongodb'

import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider'
import FakeFriendsRepository from '../repositories/fakes/FakeFriendsRepository'
import FakeSecretFriendsRepository from '../repositories/fakes/FakeSecretFriendRepository'
import CreateSecretFriendService from './CreateSecretFriendService'

let fakeFriendsRepository: FakeFriendsRepository
let fakeSecretFriendsRepository: FakeSecretFriendsRepository
let fakeMailProvider: FakeMailProvider
let createSecretFriend: CreateSecretFriendService

describe('CreateSecretFriend', () => {
  beforeEach(() => {
    fakeFriendsRepository = new FakeFriendsRepository()
    fakeSecretFriendsRepository = new FakeSecretFriendsRepository()
    fakeMailProvider = new FakeMailProvider()

    createSecretFriend = new CreateSecretFriendService(
      fakeFriendsRepository,
      fakeSecretFriendsRepository,
      fakeMailProvider
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

  it('should be able to send secret friend email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail')

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

    expect(sendMail).toHaveBeenCalled()
  })

  it('should not be able to create a secret friend with inexistent secret', async () => {
    const friend = await fakeFriendsRepository.create({
      name: 'John Doe',
      email: 'any@email.com'
    })

    await expect(
      createSecretFriend.execute({
        friend_id: friend.id,
        secret_friend_id: new ObjectID()
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to create a secret friend with inexistent friend', async () => {
    const secretFriend = await fakeFriendsRepository.create({
      name: 'John Doe',
      email: 'any@email.com'
    })

    await expect(
      createSecretFriend.execute({
        friend_id: new ObjectID(),
        secret_friend_id: secretFriend.id
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to create secret friend as same friend', async () => {
    const friend = await fakeFriendsRepository.create({
      name: 'John Doe',
      email: 'any@email.com'
    })

    await expect(
      createSecretFriend.execute({
        friend_id: friend.id,
        secret_friend_id: friend.id
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to create a secret friend if friend already has one', async () => {
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

    const friend3 = await fakeFriendsRepository.create({
      name: 'John Doe',
      email: 'any@email.com'
    })

    await expect(
      createSecretFriend.execute({
        friend_id: friend.id,
        secret_friend_id: friend3.id
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to create a secret friend if secret already has one', async () => {
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

    const friend3 = await fakeFriendsRepository.create({
      name: 'John Doe',
      email: 'any@email.com'
    })

    await expect(
      createSecretFriend.execute({
        friend_id: friend3.id,
        secret_friend_id: friend2.id
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
