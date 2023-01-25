import { BaseEntity, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'UserCommentTag' })
export class UserCommentTagEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  //*   Relation    */
}
