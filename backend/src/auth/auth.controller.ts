import { UserEntity } from 'src/Users/users.entity';
import { getUser } from 'src/common/decorator/user.data.decorator';
import { socialType } from './auth.interface';
import { AuthService } from './auth.service';
import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google') // 프론트에서 GET 요청으로 google 인증 호출
  @UseGuards(AuthGuard('google'))
  @Get('google/callback') // google 인증 후 돌아오는 callback 주소
  @UseGuards(AuthGuard('google')) // google strategy 인증 과정
  async googleAuth(
    @getUser() user: socialType | UserEntity,
    @Res() res: Response,
  ) {
    if ('password' in user) {
      const { accessToken, refreshToken } = await this.authService.createToken(
        user,
      );
      res.setHeader('Authorization', accessToken);
      res.setHeader('refreshToken', refreshToken);
      return { Authorization: accessToken };
    } else {
      await this.authService.socialSignUp(user);
    }
  }

  /**
   * Google Login
   * Strategy return {provider : 'google', user}
   */
  async loginGoogle(@Req() req: Request, @Res() res: Response) {
    this.authService.socialLogin({ req, res });
  }

  /**
   * Kakao Login
   * Strategy return {provider : 'kakao', user}
   */

  /**
   * naver Login
   * Strategy return {provider : 'naver', user}
   */
}
