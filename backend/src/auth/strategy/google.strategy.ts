import { socialType } from './../auth.interface';
import { UserEntity } from 'src/Users/users.entity';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URI,
      passReqToCallback: true,
      scope: ['email', 'profile'],
    });
  }

  async validate(profile: Profile) {
    const { id, name, emails } = profile;
    const provider = 'google';
    const userId = id;
    const username = name.givenName;
    const email = emails[0].value;
    const newUser: socialType = {
      provider,
      userId,
      username,
      email,
    };
    const existUser: UserEntity = await this.userRepository.findOneBy({
      email,
    });
    if (!existUser) {
      return newUser;
    }
    return existUser;
  }
}
