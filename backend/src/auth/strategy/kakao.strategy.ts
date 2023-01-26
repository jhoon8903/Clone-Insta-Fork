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

  async validate(profile: Profile): Promise<{ id: string }> {
    const { _json } = profile;
    const { id, email } = _json;
    const provider: string = 'kakao';
    const socialUser = new UserEntity();
    socialUser.name = provider;
    socialUser.password = id;
    socialUser.nickname = email.split('@')[0];
    socialUser.email = email;
    socialUser.profileImg = _json.profile.profile_image_url
      ? _json.profile.profile_image_url
      : process.env.DEFUALT_IMG_URL;

    const existUser: UserEntity = await this.userRepository.findOneBy({
      email,
    });
    if (!existUser) {
      const newUser = await this.userRepository.insert(socialUser);
      return { id: newUser.identifiers[0].id };
    }
    return { id: String(existUser.id) };
  }
}
