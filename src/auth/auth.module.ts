import { Module } from '@nestjs/common';
import { AuthControllers } from './auth.controllers';
import { AuthService } from './auth.services';
import { UsersRepository } from 'src/users/users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AuthControllers],
  providers: [AuthService, UsersRepository],
})
export class AuthModule {}
