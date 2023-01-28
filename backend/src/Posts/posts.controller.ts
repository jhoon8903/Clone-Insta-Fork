import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  Put,
  Get,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { PostDto } from './dtos/posts.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';

@ApiTags('Post')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}
  //*게시글 작성
  @ApiOperation({
    summary: '게시글작성',
    description: '게시글 작성',
  })
  @ApiBadRequestResponse({
    description: 'Request Body의 타입이 올바르지 않을 경우',
  })
  @ApiUnauthorizedResponse({
    description: '로그인 하지 않은 사용자일 경우',
  })
  @ApiCreatedResponse({ description: '게시글 작성에 성공한 경우' })
  @UseInterceptors()
  @Post()
  createPost(@Body() body: PostDto) {
    return this.postsService.createPost(body);
  }

  //*게시글수정
  @ApiOperation({
    summary: '게시글수정',
  })
  @ApiBadRequestResponse({
    description: 'Request Body의 타입이 올바르지 않을 경우',
  })
  @ApiForbiddenResponse({ description: '타인의 게시글을 수정하려 할 경우' })
  @ApiNotFoundResponse({
    description: '존재하지 않는 게시글을 수정하려 할 경우',
  })
  @ApiCreatedResponse({ description: '게시글이 정상적으로 수정된 경우' })
  @Put(':postId')
  patchPost(@Param('postId') postId: number, @Body() body: PostDto) {
    return this.postsService.changePost(postId, body);
  }

  //*게시글 전체 조회
  @ApiOperation({
    summary: '게시글 조회',
  })
  @ApiOkResponse({ description: '게시글이 정상적으로 조회된 경우' })
  @Get()
  findAllPost() {
    return this.postsService.findAllPost();
  }

  //*게시글 상세 조회
  @ApiOperation({
    summary: '게시글 상세 조회',
  })
  @ApiNotFoundResponse({ description: '게시글이 존재하지 않을 경우' })
  @ApiOkResponse({ description: '게시글이 정상적으로 조회된 경우' })
  @UseGuards(JwtAuthGuard)
  @Get(':postId')
  findOnePost(@Param('postId') postId: number) {
    return this.postsService.findOnePost(postId);
  }

  //*게시글삭제
  @ApiOperation({
    summary: '게시글삭제',
  })
  @ApiBadRequestResponse({
    description: 'Request Body의 타입이 올바르지 않을 경우',
  })
  @ApiForbiddenResponse({ description: '타인의 게시글을 삭제하려 할 경우' })
  @ApiNotFoundResponse({
    description: '존재하지 않는 게시글을 삭제하려 할 경우',
  })
  @ApiCreatedResponse({ description: '게시글이 정상적으로 삭제된 경우' })
  @Delete(':postId')
  deletePost(@Param('postId') postId: number) {
    return this.postsService.deletePost(postId);
  }

  //*게시글 좋아요
}
