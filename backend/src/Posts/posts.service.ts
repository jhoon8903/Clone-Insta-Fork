import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from './posts.entity';
import { Repository } from 'typeorm';
import { UserEntity } from '../Users/users.entity';
import { ImageEntity } from 'src/Images/Images.entity';
import { NotFoundError } from 'rxjs';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
    @InjectRepository(ImageEntity)
    private readonly imageRepository: Repository<ImageEntity>,
  ) {}

  async createPost(userId, body, imgUrl) {
    const { content } = body;
    const newPost = await this.postRepository.save({ userId, content });
    await this.imageRepository.save({ imgUrl, postId: newPost.id });
    return newPost;
  }

  async changePost(postId, body, userId) {
    const { content } = body;

    const result = await this.postRepository
      .createQueryBuilder()
      .update(PostEntity)
      .set({
        content: content,
      })
      .where('id = :id', { id: postId })
      .andWhere('userId=:userId', { userId: userId })
      .execute();
    if (result.affected === 0) {
      throw new ForbiddenException();
    }
    return;
  }

  async deletePost(userId, postId) {
    const result = await this.postRepository
      .createQueryBuilder()
      .delete()
      .from(PostEntity)
      .where('id = :id', { id: postId })
      .andWhere('userId=:userId', { userId: userId })
      .execute();

    if (result.affected === 0) {
      throw new ForbiddenException();
    }
    return;
  }

  async findAllPost() {
    const result = await this.postRepository
      .createQueryBuilder('p')
      .select([
        'p.id',
        'p.content',
        'p.createdAt',
        'p.updatedAt',
        'user.nickname',
        'image.imgUrl',
      ])
      .leftJoin('p.user', 'user')
      .leftJoin('p.image', 'image')
      .getMany();
    return result.map((post) => {
      return {
        id: post.id,
        content: post.content,
        nickname: post.user.nickname,
        imageUrl: post.image[0].imgUrl,
        createAt: post.createdAt,
        updateAt: post.updatedAt,
      };
    });
  }

  async findOnePost(postId: number) {
    const result = await this.postRepository
      .createQueryBuilder('p')
      .select([
        'p.id',
        'p.content',
        'p.createdAt',
        'p.updatedAt',
        'user.nickname',
        'image.imgUrl',
      ])
      .where('p.id = :id', { id: postId })
      .leftJoin('p.user', 'user')
      .leftJoin('p.image', 'image')
      .getOne();
    console.log(result);
    if (!result) throw new NotFoundException();
    return {
      id: result.id,
      content: result.content,
      nickname: result.user.nickname,
      imageUrl: result.image[0].imgUrl,
      createAt: result.createdAt,
      updateAt: result.updatedAt,
    };
  }
}
