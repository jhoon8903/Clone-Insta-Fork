import { PickType } from '@nestjs/swagger';
import { PostEntity } from '../posts.entity';

export class UserSignUpDto extends PickType(PostEntity, ['content'] as const) {}
