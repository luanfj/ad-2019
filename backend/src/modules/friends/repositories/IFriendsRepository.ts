import ICreateFriendDTO from '../dtos/ICreateFriendDTO'
import Friend from '../infra/typeorm/entities/Friend'

export default interface IFriendsRepository {
  create(data: ICreateFriendDTO): Promise<Friend>
  findByEmail(email: string): Promise<Friend | undefined>
}
