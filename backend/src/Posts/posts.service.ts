import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from './posts.entity';
import { Repository } from 'typeorm';
import { UserEntity } from '../Users/users.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
  ) {}

  async createPost(userId, body) {
    const { content } = body;
    await this.postRepository.save({ userId, content });
    return;
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
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.user', 'user')
      .getMany();

    return result.map((post) => {
      return {
        id: post.id,
        content: post.content,
        nickname: post.user.nickname,
        createAt: post.createdAt,
        updateAt: post.updatedAt,
      };
    });
  }

  async findOnePost(postId: number) {
    const result = await this.postRepository.find({
      relations: {
        user: true,
      },
      where: { id: postId },
    });

    return result.map((post) => {
      return {
        id: post.id,
        content: post.content,
        nickname: post.user.nickname,
        createAt: post.createdAt,
        updateAt: post.updatedAt,
      };
    });
  }
}
