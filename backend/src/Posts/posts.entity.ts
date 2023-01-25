import { CommentEntity } from 'src/Comments/comments.entity';
import { ImageEntity } from 'src/Images/Images.entity';
import { PostHashTagEntity } from 'src/PostHashTag/postHashTag.entity';
import { UserPostLikeEntity } from 'src/UserPostLikes/userPostLikes.entity';
import { UserPostTagEntity } from 'src/UserPostTags/userPostTags.entity';
import { UserEntity } from 'src/Users/users.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'Post' })
export class PostEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'text' })
  content: string;

  //*   Relation    */

  //*   Post | 1 : M | Comment
  @OneToMany(() => CommentEntity, (comment) => comment.post, {
    cascade: true,
  })
  comment: CommentEntity[];

  //*   Post | 1 : M | Image
  @OneToMany(() => ImageEntity, (image) => image.post, {
    cascade: true,
  })
  image: ImageEntity[];

  //*   Post | 1 : M | PostHashTag
  @OneToMany(() => PostHashTagEntity, (postHashTag) => postHashTag.post, {
    cascade: true,
  })
  postHashTag: PostHashTagEntity[];

  //*   Post | 1 : M | UserPostTag
  @OneToMany(() => UserPostTagEntity, (userPostTag) => userPostTag.post, {
    cascade: true,
  })
  userPostTag: UserPostTagEntity[];

  //*   Post | 1 : M | UserPostLike
  @OneToMany(() => UserPostLikeEntity, (userPostLike) => userPostLike.post, {
    cascade: true,
  })
  userPostLike: UserPostLikeEntity[];

  //*   Post | M : 1 | User
  @ManyToOne(() => UserEntity, (user) => user.post)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;
}
