import {
  Entity,
  ObjectIdColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column
} from 'typeorm'
import { ObjectID } from 'mongodb'

@Entity('secret_friend')
export default class SecretFriend {
  @ObjectIdColumn()
  id: ObjectID

  @Column()
  friend_id: ObjectID

  @Column()
  secret_friend_id: ObjectID

  @CreateDateColumn()
  created_at: string

  @UpdateDateColumn()
  updated_at: string
}
