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
import e, { Response } from 'express';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  async localLogin(req: AuthLoginDto): Promise<{ id: string }> {
    const { password, email } = req;
    const existUser: UserEntity = await this.usersRepository.findOneBy({
      email,
    });
    if (!existUser) {
      throw new NotFoundException('회원정보를 찾을 수 없습니다.');
    }

    if (existUser.name === 'kakao' || 'google' || 'naver')
      return { id: String(existUser.id) };
    const check = await bcrypt.compare(password, existUser.password);
    if (check) {
      return { id: String(existUser.id) };
    } else {
      throw new UnauthorizedException('아이디 또는 비빌번호를 확인해주세요');
    }
  }

  async createToken(req: string | object, res: Response) {
    const payload = req;

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '10m',
      secret: process.env.JWT_SECRET,
    });

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '7d',
      secret: process.env.JWT_SECRET,
    });
    res.header('Authorization', `Bearer ${accessToken}`);
    res.header('refreshToken', `Bearer ${refreshToken}`);
    return {
      AccessToken: `Bearer ${accessToken}`,
      RefreshToken: `Bearer ${refreshToken}`,
    };
  }
}
