import { AuthService } from './auth.service';
import {
  Controller,
  Res,
  Post,
  Body,
  BadRequestException,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';

import { Response } from 'express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthLoginDto } from './dtos/auth.login.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @ApiOperation({
    summary: '카카오 로그인',
    description: '카카오 로그인을 하는 API입니다.',
  })
  @Post('kakao')
  async kakaoLogin(@Body() body, @Res() res) {
    try {
      const { payload } = body;
      console.log(body);
      if (!payload) {
        throw new BadRequestException('카카오정보가 없습니다.');
      }
      const kakao = await this.authService.kakaoLogin(payload);
      console.log('카카오 컨트롤러', kakao);
      const token = await this.authService.kakaoUser(kakao);
      const { AccessToken, RefreshToken } = token;
      res.setHeader('Authorization', AccessToken);
      res.setHeader('RefreshToken', RefreshToken);
      console.log(token);
      if (!kakao.id) {
        throw new BadRequestException('카카오 정보가 없습니다.');
      }
      res.send();
    } catch (e) {
      console.log(e);
      throw new UnauthorizedException();
    }
  }
  @ApiOperation({
    summary: '구글 로그인',
    description: '카카오 로그인을 하는 API입니다.',
  })
  @Post('google')
  async googleLogin(@Body() body, @Res() res) {
    try {
      const { payload } = body;
      if (!payload) {
        throw new BadRequestException('카카오정보가 없습니다.');
      }
      const google = await this.authService.googleLogin(payload);
      console.log('구글 컨트롤러', google);
      const token = await this.authService.googleUser(google);
      const { AccessToken, RefreshToken } = token;
      res.setHeader('Authorization', AccessToken);
      res.setHeader('RefreshToken', RefreshToken);
      if (!google.id) {
        throw new BadRequestException('구글 정보가 없습니다.');
      }
      res.send();
    } catch (e) {
      console.log(e);
      throw new UnauthorizedException();
    }
  }

  @Post('local') // local login
  async localAuth(@Body() body: AuthLoginDto, @Res() res: Response) {
    const { id } = await this.authService.localLogin(body);
    const token = await this.authService.createToken({ id });
    const { AccessToken, RefreshToken } = token;
    res.header('Authorization', AccessToken);
    res.header('refreshToken', RefreshToken);
    res.send(token);
  }
}
