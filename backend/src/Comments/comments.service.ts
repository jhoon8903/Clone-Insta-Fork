import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentEntity } from './comments.entity';
import { CommentDto } from './dtos/comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentsRepository: Repository<CommentEntity>,
  ) {}

  async getAllComments(postId) {
    //* Nickname[UserEntity] , comment[CommentEntity], likeCount[UserCommentLike], createdAt[CommentEntity]
  }

  async createComment(data: CommentDto, postId: number) {
    const comment = this.commentsRepository.create({
      comment: data.comment,
      parentId: data.parentId,
      postId: postId,
      userId: 1, // FIXME: JWT Strategy 작성후 수정하기.
    });

    return await this.commentsRepository.insert(comment);
  }
}
