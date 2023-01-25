import { PickType } from '@nestjs/swagger';
import { CommentEntity } from '../comments.entity';

export class CommentDto extends PickType(CommentEntity, [
  'comment',
  'parentId',
] as const) {}
