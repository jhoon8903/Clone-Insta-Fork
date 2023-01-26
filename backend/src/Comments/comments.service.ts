import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentEntity } from './comments.entity';
import { CommentDto } from './dtos/comment.dto';
import { CommentUpdateDto } from './dtos/comment.update.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentsRepository: Repository<CommentEntity>,
  ) {}

  async getAllComments(postId) {
    //* Nickname[UserEntity] , comment[CommentEntity], createdAt[CommentEntity]
    const comments = await this.commentsRepository
      .createQueryBuilder('c')
      .select(['c.id', 'c.comment', 'c.parentId', 'User.nickname'])
      .innerJoin('c.user', 'User')
      .where('c.postId = :id', { id: postId })
      .getMany();

    if (!comments.length) throw new NotFoundException();

    return comments;
  }

  async createComment(data: CommentDto, postId: number) {
    const comment = this.commentsRepository.create({
      comment: data.comment,
      parentId: data.parentId,
      postId: postId,
      userId: 1, // FIXME: JWT Strategy 작성후 수정하기.
    });
    await this.commentsRepository.insert(comment);

    return;
  }

  async updateComment(data: CommentUpdateDto, commentId: number) {
    return await this.commentsRepository.update(commentId, {
      comment: data.comment,
    });
  }

  async deleteComment(commentId: number) {
    return await this.commentsRepository
      .createQueryBuilder()
      .softDelete()
      .where('id = :id', { id: commentId })
      .execute();
  }
}
