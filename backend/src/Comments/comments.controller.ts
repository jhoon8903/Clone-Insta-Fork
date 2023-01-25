import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { CommentsService } from './comments.service';
import { CommentDto } from './dtos/comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  //* FIXME: Post로 옮기기
  @ApiOperation({
    summary: '특정 게시글의 모든 댓글 조회',
  })
  @Get(':postId')
  async getAllComments(@Param('postId') postId: number) {
    return await this.commentsService.getAllComments(postId);
  }

  @ApiOperation({
    summary: '댓글 작성하기',
  })
  @Post(':postId')
  async createComment(
    @Param('postId') postId: number,
    @Body() data: CommentDto,
  ) {
    return await this.commentsService.createComment(data, postId);
  }
}
