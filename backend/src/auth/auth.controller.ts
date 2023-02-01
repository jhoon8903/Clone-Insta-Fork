import { AuthService } from './auth.service';
import { Controller, Res, Get, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { getUser } from 'src/common/decorator/user.data.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @ApiOperation({
    summary: '카카오 로그인',
    description: '카카오 로그인을 하는 API입니다.',
  })
  @Get('kakao/callback') // google 인증 후 돌아오는 callback 주소
  @UseGuards(AuthGuard('kakao')) // kakao strategy 인증 과정
  async kakaoAuthRedirect(@getUser() id: number, nickname: string, @Res() res) {
    const token = await this.authService.createToken(id);
    const { AccessToken, RefreshToken } = token;
    res.setHeader('Authorization', AccessToken);
    res.setHeader('RefreshToken', RefreshToken);
    res.send({ token, nickname });
  }

  // @Post('kakao')
  // async kakaoLogin(@Body() body, @Res() res) {
  //   try {
  //     const { payload } = body;
  //     console.log(body);
  //     if (!payload) {
  //       throw new BadRequestException('카카오정보가 없습니다.');
  //     }
  //     const kakao = await this.authService.kakaoLogin(payload);
  //     console.log('카카오 컨트롤러', kakao);
  //     const kakaoInfo = await this.authService.kakaoUser(kakao);
  //     const { token, nickname } = kakaoInfo;
  //     const { AccessToken, RefreshToken } = token;
  //     res.setHeader('Authorization', AccessToken);
  //     res.setHeader('RefreshToken', RefreshToken);
  //     console.log(token, nickname);
  //     if (!kakao.id) {
  //       throw new BadRequestException('카카오 정보가 없습니다.');
  //     }
  //     res.send({ nickname, token });
  //   } catch (e) {
  //     console.log(e);
  //     throw new UnauthorizedException();
  //   }
  // }
  // @ApiOperation({
  //   summary: '구글 로그인',
  //   description: '카카오 로그인을 하는 API입니다.',
  // })
  // @Post('google')
  // async googleLogin(@Body() body, @Res() res) {
  //   try {
  //     const { payload } = body;
  //     if (!payload) {
  //       throw new BadRequestException('구글 정보가 없습니다.');
  //     }
  //     const google = await this.authService.googleLogin(payload);
  //     console.log('구글 컨트롤러', google);
  //     const googleInfo = await this.authService.googleUser(google);
  //     const { token, nickname } = googleInfo;
  //     const { AccessToken, RefreshToken } = token;
  //     res.setHeader('Authorization', AccessToken);
  //     res.setHeader('RefreshToken', RefreshToken);
  //     if (!google.id) {
  //       throw new BadRequestException('구글 정보가 없습니다.');
  //     }
  //     res.send({ token, nickname });
  //   } catch (e) {
  //     console.log(e);
  //     throw new UnauthorizedException();
  //   }
  // }

  // @Post('local') // local login
  // async localAuth(@Body() body: AuthLoginDto, @Res() res: Response) {
  //   const { id, nickname } = await this.authService.localLogin(body);
  //   const token = await this.authService.createToken({ id });
  //   const { AccessToken, RefreshToken } = token;
  //   res.header('Authorization', AccessToken);
  //   res.header('refreshToken', RefreshToken);
  //   res.send({ token, nickname });
  // }
}
