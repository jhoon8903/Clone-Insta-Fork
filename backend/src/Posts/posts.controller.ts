import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  Put,
  Get,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}
  //*게시글 작성
  @ApiOperation({
    summary: '게시글작성',
  })
  @Post()
  createPost(@Body() body) {
    return this.postsService.createPost(body);
  }

  //*게시글수정
  @ApiOperation({
    summary: '게시글수정',
  })
  @Put(':postId')
  patchPost(@Param() param, @Body() body) {
    return this.postsService.changePost(param, body);
  }

  //*게시글 전체 조회
  @ApiOperation({
    summary: '게시글 조회',
  })
  @Get()
  findAllPost() {
    return this.postsService.findAllPost();
  }

  //*게시글 상세 조회
  @ApiOperation({
    summary: '게시글 상세 조회',
  })
  @Get(':postId')
  findOnePost(@Param() param) {
    return this.postsService.findOnePost(param);
  }

  //*게시글삭제
  @ApiOperation({
    summary: '게시글삭제',
  })
  @Delete(':postId')
  deletePost(@Param() param) {
    return this.postsService.deletePost(param);
  }
}
