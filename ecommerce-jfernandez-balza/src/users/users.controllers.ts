import {
  Controller,
  Get,
  Param,
  Body,
  Put,
  Delete,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import { UsersService } from './users.services';
import { AuthGuard } from '../auth/guards/auth.guard';
import { CreateUserDto } from 'src/dtos/users.dto';
import { Roles } from 'src/decorators/roles';
import { Role } from 'src/roles.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersControllers {
  constructor(private readonly usersService: UsersService) {}
  @ApiBearerAuth()
  @Get()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  getUsers() {
    return this.usersService.getUsersService();
  }
  @ApiBearerAuth()
  @Get(':id')
  @UseGuards(AuthGuard)
  getUserById(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.getUserByIdService(id);
  }

  @ApiBearerAuth()
  @Put(':id')
  @UseGuards(AuthGuard)
  updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUser: CreateUserDto,
  ) {
    return this.usersService.updateUserService(id, updateUser);
  }

  @ApiBearerAuth()
  @Delete(':id')
  @UseGuards(AuthGuard)
  deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.deleteUserService(id);
  }
}
