import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  /**
   * Google Login
   * Strategy return {provider : 'google', user}
   */
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {}
}
