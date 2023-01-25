import { BaseEntity, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'UserCommentLike' })
export class UserCommentLikeEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  //*   Relation    */
}
