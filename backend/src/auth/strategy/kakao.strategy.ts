import { tokenType } from './../auth.interface';
import { AuthService } from './../auth.service';
import { UserEntity } from 'src/Users/users.entity';
import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile, Strategy } from 'passport-kakao';
import { Repository } from 'typeorm';
@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  private logger = new Logger('KAKAO');
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private readonly authSerice: AuthService,
  ) {
    super({
      clientID: process.env.KAKAO_CLIENT_ID,
      callbackURL: process.env.KAKAO_CALLBACK_URI,
      scope: ['account_email', 'profile_nickname', 'profile_image'],
    });
  }

  async validate(
    accesstoken: string,
    refereshtoken: string,
    profile: Profile,
  ): Promise<tokenType> {
    delete profile._raw;
    this.logger.log(profile);
    const { _json } = profile;
    const { id, kakao_account } = _json;
    const email = kakao_account.email;
    const provider = 'kakao';
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
      const tokenId: string = newUser.identifiers[0].id;
      const token = await this.authSerice.createToken(tokenId);
      return token;
    }
  }
}
