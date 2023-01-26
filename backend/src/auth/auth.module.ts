import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { KakaoStrategy } from './strategy/kakao.strategy';
import { GoogleStrategy } from './strategy/google.strategy';
import { NaverStrategy } from './strategy/naver.strategy';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtModule, JwtService } from '@nestjs/jwt';
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
  providers: [
    AuthService,
    KakaoStrategy,
    GoogleStrategy,
    NaverStrategy,
    LocalStrategy,
  ],
  exports: [AuthModule],
})
export class AuthModule {}
