import { UserEntity } from 'src/Users/users.entity';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {
    super({
      secretOrKey: process.env.JWT_SECRET,
    });
  }
  async validate(payload) {
    const { nickname, id } = payload;
    const user: UserEntity = await this.userRepository.findOneBy({
      nickname,
      id,
    });
    if (!user) throw new UnauthorizedException('유효하지 않은 토큰 입니다.');
    return user;
  }
}
