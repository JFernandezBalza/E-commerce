import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.services';
import { LoginUserDto } from 'src/dtos/loginUser.dto';

@Controller('auth')
export class AuthControllers {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  signLogin(@Body() credentials: LoginUserDto) {
    return this.authService.signLogin(credentials);
  }
}
