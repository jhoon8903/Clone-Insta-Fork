import { PickType } from '@nestjs/swagger';
import { PostEntity } from '../posts.entity';
export class PostDto extends PickType(PostEntity, [
  'content',
  // 'user',
] as const) {}
