import { socialType } from './auth.interface';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/Users/users.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  async createToken(user: UserEntity) {
    const payload: UserEntity = user;
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '10m',
      secret: process.env.JWT_SECRET,
    });
    const refreshToken = this.jwtService.sign(accessToken, { expiresIn: '7d' });
    return { accessToken, refreshToken };
  }

  async socialSignUp(user: socialType) {
    const;
  }
}
