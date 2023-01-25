import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { UserSignUpDto } from './dtos/users.signup.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({
    summary: 'Sign Up',
  })
  @Post('signup')
  async signUp(@Body() body: UserSignUpDto) {
    return await this.usersService.signUp(body);
  }
}
