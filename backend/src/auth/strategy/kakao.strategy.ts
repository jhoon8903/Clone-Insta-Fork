import { UserEntity } from 'src/Users/users.entity';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile, Strategy } from 'passport-kakao';
import { Repository } from 'typeorm';
@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {
    super({
      clientID: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_CLIENT_SECRET,
      callbackURL: process.env.KAKAO_CALLBACK_URI,
      scope: ['account_email', 'profile_nickname'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    const email = profile._json.kakao_account.email;
    const user: UserEntity = await this.userRepository.findOneBy({ email });
    return { provider: 'kakao', user };
  }
}
