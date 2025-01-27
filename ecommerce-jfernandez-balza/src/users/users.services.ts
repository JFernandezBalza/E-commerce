import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from 'src/dtos/users.dto';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}
  async getUsersService() {
    return await this.usersRepository.getUsers();
  }
  async getUserByIdService(id: string) {
    return await this.usersRepository.getUserById(id);
  }
  async createUserService(newUser: CreateUserDto): Promise<User> {
    return await this.usersRepository.createUser(newUser);
  }
  async updateUserService(
    id: string,
    updateUser: CreateUserDto,
  ): Promise<string> {
    return await this.usersRepository.updateUser(id, updateUser);
  }

  async deleteUserService(id: string): Promise<string> {
    return await this.usersRepository.deleteUser(id);
  }
}
