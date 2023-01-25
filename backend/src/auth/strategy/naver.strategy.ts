import { UserEntity } from 'src/Users/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-naver';
import { Repository } from 'typeorm';
@Injectable()
export class NaverStrategy extends PassportStrategy(Strategy, 'naver') {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {
    super({
      clientID: process.env.NAVER_CLIENT_IDD,
      clientSecret: process.env.NAVER_CLIENT_SECRET,
      callbackURL: process.env.NAVER_CALLBACK_URI,
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    const email = profile._json.email;
    const user: UserEntity = await this.userRepository.findOneBy({ email });
    return { provider: 'naver', user };
  }
}
