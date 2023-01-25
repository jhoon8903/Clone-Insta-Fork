import { PostEntity } from 'src/Posts/posts.entity';
import { UserEntity } from 'src/Users/users.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'UserPostLike' })
export class UserPostLikeEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'int' })
  userId: number;

  @Column({ type: 'int' })
  postId: number;

  //*   Relation    */

  //*   UserPostLike | M : 1 | User
  @ManyToOne(() => UserEntity, (user) => user.userPostLike)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  //*   UserPostLike | M : 1 | Post
  @ManyToOne(() => PostEntity, (post) => post.userPostLike)
  @JoinColumn({ name: 'postId' })
  post: PostEntity;
}
