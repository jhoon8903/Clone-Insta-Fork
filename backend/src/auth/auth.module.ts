import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { KakaoStrategy } from './strategy/kakao.strategy';
import { GoogleStrategy } from './strategy/google.strategy';
import { NaverStrategy } from './strategy/naver.strategy';
import { LocalStrategy } from './strategy/local.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, KakaoStrategy, GoogleStrategy, NaverStrategy, LocalStrategy],
})
export class AuthModule {}
