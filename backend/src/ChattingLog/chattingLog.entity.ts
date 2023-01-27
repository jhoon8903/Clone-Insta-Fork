import { ChattingRoomEntity } from './../ChattingRoom/chattingRoom.entity';
import { CommonEntity } from 'src/common/entity/common.entity';
import { UserEntity } from 'src/Users/users.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ChattingRoomUserListEntity } from 'src/ChattingRoomUserList/chattingRoomUsetList.entity';

@Entity({ name: 'ChattingLog' })
export class ChattingLogEntity extends CommonEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'int' })
  userId: number;

  @Column({ type: 'int' })
  chattingRoomId: number;

  @Column({ type: 'text' })
  chat: string;

  //*   Relation    */

  //*   ChattingLog | M : 1 | ChattingRoom
  @ManyToOne(
    () => ChattingRoomEntity,
    (chattingRoom) => chattingRoom.chattingLog,
  )
  @JoinColumn({ name: 'chattingRoomId' })
  chattingRoom: ChattingRoomEntity;

  //*   ChattingLog | M : 1 | User
  @ManyToOne(() => UserEntity, (user) => user.chattingLog)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;
}
