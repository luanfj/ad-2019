import {
  Entity,
  ObjectIdColumn,
  ObjectID,
  Column,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm'

@Entity('secret_friend')
export default class SecretFriend {
  @ObjectIdColumn()
  id: ObjectID

  @Column()
  friend_id: string

  @Column()
  secret_friend_id: string

  @CreateDateColumn()
  created_at: string

  @UpdateDateColumn()
  updated_at: string
}
