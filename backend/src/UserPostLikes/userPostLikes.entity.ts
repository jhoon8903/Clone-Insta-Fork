import { BaseEntity, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'UserPostLike' })
export class UserPostLikeEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  //*   Relation    */
}
