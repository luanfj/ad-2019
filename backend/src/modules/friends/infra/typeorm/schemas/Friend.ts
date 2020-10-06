import {
  Entity,
  ObjectIdColumn,
  ObjectID,
  Column,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm'

@Entity('friends')
export default class Friend {
  @ObjectIdColumn()
  id: ObjectID

  @Column()
  name: string

  @Column()
  email: string

  @CreateDateColumn()
  created_at: string

  @UpdateDateColumn()
  updated_at: string
}
