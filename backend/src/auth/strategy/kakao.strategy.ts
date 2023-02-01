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
      scope: ['account_email', 'profile_nickname', 'profile_image'],
    });
  }

  async validate(
    accesstoken: string,
    refereshtoken: string,
    profile: Profile,
  ): Promise<{ id: number; nickname: string }> {
    const { _json } = profile;
    const { id, kakao_account } = _json;
    const email = kakao_account.email;
    const provider: string = 'kakao';
    const socialUser = new UserEntity();
    socialUser.name = provider;
    socialUser.password = id;
    socialUser.nickname = email.split('@')[0];
    socialUser.email = email;
    socialUser.profileImg = kakao_account.profile.profile_image_url
      ? kakao_account.profile.profile_image_url
      : process.env.DEFUALT_IMG_URL;

    const existUser: UserEntity = await this.userRepository.findOneBy({
      email,
    });
    if (!existUser) {
      const newUser = await this.userRepository.insert(socialUser);
      const id: number = newUser.identifiers[0].id;
      const nickname: string = newUser.identifiers[0].nickname;
      return { id, nickname };
    } else {
      const id: number = existUser.id;
      const nickname: string = existUser.nickname;
      return { id, nickname };
    }
  }
}
