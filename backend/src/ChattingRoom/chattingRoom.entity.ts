import { ChattingLogEntity } from './../ChattingLog/chattingLog.entity';
import { CommonEntity } from 'src/common/entity/common.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ChattingRoomUserListEntity } from 'src/ChattingRoomUserList/chattingRoomUsetList.entity';

@Entity({ name: 'ChattingRoom' })
export class ChattingRoomEntity extends CommonEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 32 })
  roomName: string;

  //*   Relation    */

  //*   ChattingRoom | 1 : M | ChattingLog
  @OneToMany(
    () => ChattingLogEntity,
    (chattingLog) => chattingLog.chattingRoom,
    {
      cascade: true,
    },
  )
  chattingLog: ChattingLogEntity[];
  //*   ChattingRoom | 1 : M | ChattingRoomUserList
  @OneToMany(
    () => ChattingRoomUserListEntity,
    (chattingRoomUserList) => chattingRoomUserList.chattingRoom,
    {
      cascade: true,
    },
  )
  chattingRoomUserList: ChattingLogEntity[];
}
