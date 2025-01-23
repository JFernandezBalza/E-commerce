import { Module } from '@nestjs/common';
import { UsersControllers } from './users.controllers';
import { UsersService } from './users.services';
import { UsersRepository } from './users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersControllers],
  providers: [UsersService, UsersRepository],
})
export class UsersModule {}
