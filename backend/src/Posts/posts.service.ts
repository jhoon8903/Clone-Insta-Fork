import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from './posts.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
  ) {}

  async createPost(body) {
    const { content } = body;
    const userId = 1;
    return await this.postRepository.save({ userId, content });
  }

  async changePost(postId, body) {
    const { content } = body;
    const userId = 1;
    return await this.postRepository
      .createQueryBuilder()
      .update(PostEntity)
      .set({
        content: content,
      })
      .where('id = :id', { id: postId })
      .andWhere('userId=:userId', { userId: userId })
      .execute();
  }

  async deletePost(postId) {
    const userId = 1;
    return await this.postRepository
      .createQueryBuilder()
      .delete()
      .from(PostEntity)
      .where('id = :id', { id: postId })
      .execute();
  }

  async findAllPost() {
    return await this.postRepository.find();
  }

  async findOnePost(postId: number) {
    return await this.postRepository.findOneBy({
      id: postId,
    });
  }
}
