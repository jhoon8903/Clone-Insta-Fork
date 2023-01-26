import { tokenType } from './auth.interface';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/Users/users.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  async createToken(req: UserEntity, res: Response): Promise<tokenType> {
    const payload: UserEntity = req;
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '10m',
      secret: process.env.JWT_SECRET,
    });
    const refreshToken = this.jwtService.sign(accessToken, { expiresIn: '7d' });
    res.setHeader('Authorization', accessToken);
    res.setHeader('refreshToken', refreshToken);
    return { accessToken, refreshToken };
  }
}
