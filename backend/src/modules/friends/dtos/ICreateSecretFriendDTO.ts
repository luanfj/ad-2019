import { ObjectID } from 'mongodb'

export default interface ICreateSecretFriendDTO {
  friend_id: ObjectID
  secret_friend_id: ObjectID
}
