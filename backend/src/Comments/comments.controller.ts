import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Delete, HttpCode, Put } from '@nestjs/common/decorators';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { DeleteDateColumn } from 'typeorm';
import { CommentsService } from './comments.service';
import { CommentDto } from './dtos/comment.dto';
import { CommentUpdateDto } from './dtos/comment.update.dto';

@ApiTags('Comment')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  //* FIXME: Post로 옮기기
  @ApiOperation({
    summary: '특정 게시글의 모든 댓글 조회',
    description: 'Params 에 해당하는 게시글의 댓글을 조회한다.',
  })
  @ApiNotFoundResponse({
    description: '존재하지 않는 게시글의 댓글을 불러오려 시도 할 경우',
  })
  @ApiOkResponse({ description: '정상적으로 댓글을 전부 불러온 경우.' })
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

  @ApiOperation({
    summary: '댓글 수정하기',
  })
  @ApiCreatedResponse({
    description: '댓글 수정에 성공 하였을 경우',
  })
  @ApiBadRequestResponse({
    description: 'Request Body의 타입이 올바르지 않은 경우',
  })
  @ApiForbiddenResponse({ description: '타인의 댓글을 수정하려 할 경우' })
  @ApiNotFoundResponse({ description: '존재하지 않는 댓글을 수정하려 할 경우' })
  @HttpCode(201)
  @Put(':commentId')
  async updateComment(
    @Param('commentId') commentId: number,
    @Body() data: CommentUpdateDto,
  ) {
    await this.commentsService.updateComment(data, commentId);
    return;
  }

  @ApiOperation({
    summary: '댓글 삭제하기',
  })
  @ApiNoContentResponse({
    description: '댓글 삭제에 성공 하였을 경우',
  })
  @ApiBadRequestResponse({
    description: 'Request Body의 타입이 올바르지 않은 경우',
  })
  @ApiForbiddenResponse({ description: '타인의 댓글을 삭제하려 할 경우' })
  @ApiNotFoundResponse({ description: '존재하지 않는 댓글을 삭제하려 할 경우' })
  @Delete()
  async deleteComment() {
    //
  }
}
