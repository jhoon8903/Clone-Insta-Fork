import { ConflictException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserSignUpDto } from './dtos/users.signup.dto';
import { UserEntity } from './users.entity';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  async signUp(body: UserSignUpDto) {
    const { email, password } = body;

    const profileImg = body.profileImg
      ? body.profileImg
      : process.env.DEFAULT_IMG_URL;

    const isUserExist = await this.usersRepository.findOneBy({ email });

    if (isUserExist) throw new ConflictException('이미 존재하는 Email 입니다.');

    const salt = Number(process.env.BCRYPT_SALT);

    const hashedPassword = await bcrypt.hash(password, salt);

    return await this.usersRepository.save({
      ...body,
      password: hashedPassword,
      profileImg: profileImg,
    });
  }
}
