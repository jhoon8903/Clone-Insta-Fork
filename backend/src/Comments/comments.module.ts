import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentEntity } from './comments.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CommentEntity])],
  providers: [CommentsService],
  controllers: [CommentsController],
})
export class CommentsModule {}
