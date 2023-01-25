import { HashTagEntity } from 'src/HashTags/hashTags.entity';
import { PostEntity } from 'src/Posts/posts.entity';
import {
  BaseEntity,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'PostHashTag' })
export class PostHashTagEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  //*   Relation    */

  //*   PostHashTag | M : 1 | Post
  @ManyToOne(() => PostEntity, (post) => post.postHashTag)
  @JoinColumn({ name: 'postId' })
  post: PostEntity;

  //*   PostHashTag | M : 1 | HashTag
  @ManyToOne(() => HashTagEntity, (hashTag) => hashTag.postHashTag)
  @JoinColumn({ name: 'hashTagId' })
  hashTag: HashTagEntity;
}
