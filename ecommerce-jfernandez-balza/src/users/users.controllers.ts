import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.services';
import { AuthGuard } from '../auth/guards/auth.guard';
import { CreateUserDto } from 'src/dtos/users.dto';

@Controller('users')
export class UsersControllers {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard)
  getUsers() {
    return this.usersService.getUsersService();
  }
  @Get(':id')
  @UseGuards(AuthGuard)
  getUserById(@Param('id') id: string) {
    return this.usersService.getUserByIdService(id);
  }

  @Post()
  createUser(@Body() newUser: CreateUserDto) {
    return this.usersService.createUserService(newUser);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  updateUser(@Param('id') id: string, @Body() updateUser: CreateUserDto) {
    return this.usersService.updateUserService(id, updateUser);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUserService(id);
  }
}
