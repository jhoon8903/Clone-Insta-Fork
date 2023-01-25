import { CommentEntity } from 'src/Comments/comments.entity';
import { UserEntity } from 'src/Users/users.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'UserCommentTag' })
export class UserCommentTagEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'int' })
  userId: number;

  @Column({ type: 'int' })
  commentId: number;

  //*   Relation    */

  //*   UserCommentTag | M : 1 | User
  @ManyToOne(() => UserEntity, (user) => user.userCommentTag)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  //*   UserCommentTag | M : 1 | Comment
  @ManyToOne(() => CommentEntity, (comment) => comment.userCommentTag)
  @JoinColumn({ name: 'commentId' })
  comment: CommentEntity;
}
