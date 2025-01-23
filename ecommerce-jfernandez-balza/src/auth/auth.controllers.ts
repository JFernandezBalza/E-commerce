import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.services';

@Controller('auth')
export class AuthControllers {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  signLogin(@Body() credentials: { email: string; password: string }) {
    return this.authService.signLogin(credentials);
  }
}
