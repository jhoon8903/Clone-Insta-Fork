import { ChattingRoomEntity } from 'src/ChattingRoom/chattingRoom.entity';
import { CommonEntity } from 'src/common/entity/common.entity';
import { UserEntity } from 'src/Users/users.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'ChattingRoomUserList' })
export class ChattingRoomUserListEntity extends CommonEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'int' })
  userId: number;

  @Column({ type: 'int' })
  chattingRoomId: number;

  @Column({ type: 'text' })
  chat: string;

  //*   Relation    */

  //*   chattingRoomUserList | M : 1 | Use
  @ManyToOne(() => UserEntity, (user) => user.chattingRoomUserList)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  //*   chattingRoomUserList | M : 1 | ChattingRoom
  @ManyToOne(
    () => ChattingRoomEntity,
    (chattingRoom) => chattingRoom.chattingRoomUserList,
  )
  @JoinColumn({ name: 'chattingRoomId' })
  chattingRoom: ChattingRoomEntity;
}
