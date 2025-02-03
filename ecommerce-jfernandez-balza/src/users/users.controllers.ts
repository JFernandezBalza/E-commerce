import {
  Controller,
  Get,
  Param,
  Body,
  Put,
  Delete,
  UseGuards,
  ParseUUIDPipe,
  Query,
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
  getUsers(@Query(`page`) page: string, @Query(`limit`) limit: string) {
    const pageNumber = parseInt(page) || 1;
    const limitNumber = parseInt(limit) || 10;
    return this.usersService.getUsersService(pageNumber, limitNumber);
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
