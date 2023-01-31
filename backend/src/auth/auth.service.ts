import { KakaoDataDto } from './dtos/kakao.dto';
import { AuthLoginDto } from './dtos/auth.login.dto';
import { tokenType } from './auth.interface';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/Users/users.entity';
import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Logger } from '@nestjs/common/services';
import axios from 'axios';
import qs from 'qs';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}
  //////////////////////////////////////////////////////////////////
  // 카카오 로그인 ///
  /////////////////////////////////////////////////////////////////
  async kakaoLogin(payload: string) {
    const code = payload;
    const kakaoKey = '1b6507f790effacecbec0df34314f133'; /////// 이부분은 REST_API KEY
    const kakaoTokenUrl = 'https://kauth.kakao.com/oauth/token';
    const kakaoUserInfoUrl = 'https://kapi.kakao.com/v2/user/me';
    const body = {
      grant_type: 'authorization_code',
      client_id: kakaoKey,
      redirect_uri: `http://localhost:3000/oauth`,
      code,
    };
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    };
    try {
      const response = await axios({
        method: 'POST',
        url: kakaoTokenUrl,
        timeout: 30000,
        headers,
        data: qs.stringify(body),
      });

      if (response.status === 200) {
        const headerUserInfo = {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
          Authorization: 'Bearer ' + response.data.access_token,
        };
        const responseUserInfo = await axios({
          method: 'GET',
          url: kakaoUserInfoUrl,
          timeout: 30000,
          headers: headerUserInfo,
        });

        if (responseUserInfo.status === 200) {
          console.log(responseUserInfo);
          return responseUserInfo.data;
        } else {
          throw new UnauthorizedException();
        }
      } else {
        throw new UnauthorizedException();
      }
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  //////////////////////////////////////////////////////////////////
  // 카카오 회원가입 ///
  /////////////////////////////////////////////////////////////////
  async kakaoUser(kakao: KakaoDataDto) {
    const { id, properties, kakao_account } = kakao;
    const { email } = kakao_account;
    const kakaoUser = new UserEntity();
    kakaoUser.password = String(id);
    kakaoUser.name = 'kakao';
    kakaoUser.email = email;
    kakaoUser.nickname = email.split('@')[0];
    kakaoUser.profileImg = properties.profile_image
      ? properties.profile_image
      : process.env.DEFUALT_IMG_URL;

    const existUser: UserEntity = await this.userRepository.findOneBy({
      email,
    });
    if (!existUser) {
      const newUser = await this.userRepository.insert(kakaoUser);
      const tokenId: number = newUser.identifiers[0].id;
      const token = await this.createToken({ tokenId });
      return token;
    }
    const ExistUser = existUser;
    const tokenId: number = ExistUser.id;
    const token = await this.createToken({ tokenId });
    return token;
  }

  //////////////////////////////////////////////////////////////////
  // 로컬 로그인 ///
  /////////////////////////////////////////////////////////////////
  async localLogin(req: AuthLoginDto): Promise<{ id: string }> {
    const { password, email } = req;
    const existUser: UserEntity = await this.userRepository.findOneBy({
      email,
    });
    Logger.log(JSON.parse(JSON.stringify(existUser)), 'Auth');
    if (!existUser) {
      throw new NotFoundException('회원정보를 찾을 수 없습니다.');
    }

    if (
      existUser.name === 'kakao' ||
      existUser.name === 'google' ||
      existUser.name === 'naver'
    ) {
      return { id: String(existUser.id) };
    }

    const check = await bcrypt.compare(password, existUser.password);
    Logger.log(check, 'Auth');
    if (check) {
      return { id: String(existUser.id) };
    } else {
      throw new UnauthorizedException('아이디 또는 비빌번호를 확인해주세요');
    }
  }
  //////////////////////////////////////////////////////////////////
  // 토큰생성 ///
  /////////////////////////////////////////////////////////////////
  async createToken(req: string | object): Promise<tokenType> {
    const payload = req;

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '10m',
      secret: process.env.JWT_SECRET,
    });

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '7d',
      secret: process.env.JWT_SECRET,
    });

    return {
      AccessToken: `Bearer ${accessToken}`,
      RefreshToken: `Bearer ${refreshToken}`,
    };
  }
}
