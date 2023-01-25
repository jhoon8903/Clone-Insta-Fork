import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserEntity } from './Users/users.entity';
import { UserPostTagEntity } from './UserPostTags/userPostTags.entity';
import { UserPostLikeEntity } from './UserPostLikes/userPostLikes.entity';
import { UserCommentTagEntity } from './UserCommentTags/userCommentTags.entity';
import { UserCommentLikeEntity } from './UserCommentLikes/userCommentLikes.entity';
import { PostEntity } from './Posts/posts.entity';
import { PostHashTagEntity } from './PostHashTag/postHashTag.entity';
import { ImageEntity } from './Images/Images.entity';
import { HashTagEntity } from './HashTags/hashTags.entity';
import { FollowEntity } from './Follows/follows.entity';
import { CommentEntity } from './Comments/comments.entity';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { CommentsModule } from './comments/comments.module';

const typeOrmModuleOptions = {
  useFactory: async (
    configService: ConfigService,
  ): Promise<TypeOrmModuleOptions> => ({
    type: 'mysql',
    host: configService.get('DB_HOST'),
    port: 3306,
    username: configService.get('DB_USER_NAME'),
    password: configService.get('DB_USER_PASSWORD'),
    database: configService.get('DB_NAME'),
    entities: [
      UserEntity,
      UserPostTagEntity,
      UserPostLikeEntity,
      UserCommentTagEntity,
      UserCommentLikeEntity,
      PostEntity,
      PostHashTagEntity,
      ImageEntity,
      HashTagEntity,
      FollowEntity,
      CommentEntity,
    ],
    synchronize: true,
    autoLoadEntities: true,
    logging: true,
    keepConnectionAlive: true,
  }),
  inject: [ConfigService],
};

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    TypeOrmModule.forRootAsync(typeOrmModuleOptions),
    UsersModule,
    CommentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
