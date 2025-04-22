import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.services';
import { LoginUserDto } from '../dtos/loginUser.dto';
import { CreateUserDto } from 'src/dtos/users.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthControllers {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  signIn(@Body() credentials: LoginUserDto) {
    const { email, password } = credentials;
    return this.authService.signLogin(email, password);
  }
  @Post('signup')
  signupUser(@Body() user: CreateUserDto) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordConfirm, ...cleanUser } = user;

    return this.authService.signupUser(cleanUser);
  }
}
