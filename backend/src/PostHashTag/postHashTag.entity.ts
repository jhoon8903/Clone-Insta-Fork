import { BaseEntity, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'PostHashTag' })
export class PostHashTagEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  //*   Relation    */
}
