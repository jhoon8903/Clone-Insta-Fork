import { PostEntity } from 'src/Posts/posts.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'Image' })
export class ImageEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'text' })
  imgUrl: string;

  //*   Relation    */

  //*   Image | M : 1 | Post
  @ManyToOne(() => PostEntity, (post) => post.image)
  @JoinColumn({ name: 'postId' })
  post: PostEntity;
}
