import { CommentEntity } from 'src/Comments/comments.entity';
import { UserEntity } from 'src/Users/users.entity';
import {
  BaseEntity,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'UserCommentLike' })
export class UserCommentLikeEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  //*   Relation    */

  //*   UserCommentLike | M : 1 | User
  @ManyToOne(() => UserEntity, (user) => user.userCommentLike)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  //*   UserCommentLike | M : 1 | Comment
  @ManyToOne(() => CommentEntity, (comment) => comment.userCommentLike)
  @JoinColumn({ name: 'commentId' })
  comment: CommentEntity;
}
