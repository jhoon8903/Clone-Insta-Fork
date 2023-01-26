import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { KakaoStrategy } from './strategy/kakao.strategy';
import { GoogleStrategy } from './strategy/google.strategy';
import { NaverStrategy } from './strategy/naver.strategy';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserEntity } from 'src/Users/users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [
    JwtModule,
    PassportModule.register({}),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [AuthController],
  providers: [AuthService, KakaoStrategy, GoogleStrategy, NaverStrategy],
  exports: [AuthModule],
})
export class AuthModule {}
