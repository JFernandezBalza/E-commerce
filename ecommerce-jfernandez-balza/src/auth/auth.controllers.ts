import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.services';
import { LoginUserDto } from '../dtos/loginUser.dto';

@Controller('auth')
export class AuthControllers {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  signIn(@Body() credentials: LoginUserDto) {
    return this.authService.signLogin(credentials);
  }
}
