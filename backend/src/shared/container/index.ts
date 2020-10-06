import { container } from 'tsyringe'

import './providers'

import IFriendsRepository from '@modules/friends/repositories/IFriendsRepository'
import FriendsRepository from '@modules/friends/infra/typeorm/repositories/FriendsRepository'

import ISecretFriendsRepository from '@modules/friends/repositories/ISecretFriendsRepository'
import SecretFriendsRepository from '@modules/friends/infra/typeorm/repositories/SecretFriendsRepository'

container.registerSingleton<IFriendsRepository>(
  'FriendsRepository',
  FriendsRepository
)

container.registerSingleton<ISecretFriendsRepository>(
  'SecretFriendsRepository',
  SecretFriendsRepository
)
