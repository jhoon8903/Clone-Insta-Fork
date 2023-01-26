import { UserEntity } from 'src/Users/users.entity';
import { getUser } from 'src/common/decorator/user.data.decorator';
import { tokenType } from './auth.interface';
import { AuthService } from './auth.service';
import { Controller, Get, Res, UseGuards, Post } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google') // 프론트에서 GET 요청으로 google 인증 호출
  @UseGuards(AuthGuard('google'))
  @Get('google/callback') // google 인증 후 돌아오는 callback 주소
  @UseGuards(AuthGuard('google')) // google strategy 인증 과정
  async googleAuth(
    @getUser() id: UserEntity,
    @Res() res: Response,
  ): Promise<tokenType> {
    const { accessToken, refreshToken } = await this.authService.createToken(
      id,
      res,
    );
    return { accessToken, refreshToken };
  }
  @Get('kakao') // 프론트에서 GET 요청으로 kakao 인증 호출
  @UseGuards(AuthGuard('kakao'))
  @Get('kakao/callback') // google 인증 후 돌아오는 callback 주소
  @UseGuards(AuthGuard('kakao')) // kakao strategy 인증 과정
  async kakaoAuth(
    @getUser() id: UserEntity,
    @Res() res: Response,
  ): Promise<tokenType> {
    const { accessToken, refreshToken } = await this.authService.createToken(
      id,
      res,
    );
    return { accessToken, refreshToken };
  }
  @Get('naver') // 프론트에서 GET 요청으로'naver 인증 호출
  @UseGuards(AuthGuard('naver'))
  @Get('naver/callback') //'naver 인증 후 돌아오는 callback 주소
  @UseGuards(AuthGuard('naver')) //'naver strategy 인증 과정
  async naverAuth(
    @getUser() id: UserEntity,
    @Res() res: Response,
  ): Promise<tokenType> {
    const { accessToken, refreshToken } = await this.authService.createToken(
      id,
      res,
    );
    return { accessToken, refreshToken };
  }
  @Post('local') // local 인증 후 돌아오는 callback 주소
  @UseGuards(AuthGuard('local')) // local strategy 인증 과정
  async localAuth(
    @getUser() id: UserEntity,
    @Res() res: Response,
  ): Promise<tokenType> {
    const { accessToken, refreshToken } = await this.authService.createToken(
      id,
      res,
    );
    return { accessToken, refreshToken };
  }
}
