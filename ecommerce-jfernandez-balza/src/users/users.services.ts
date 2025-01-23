import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}
  async getUsersService(): Promise<Omit<User, `password`>[]> {
    return await this.usersRepository.getUsers();
  }
  async getUserByIdService(id: string): Promise<Omit<User, `password`>> {
    return await this.usersRepository.getUserById(id);
  }
  async createUserService(newUser: User): Promise<string> {
    return await this.usersRepository.createUser(newUser);
  }
  async updateUserService(id: string, updateUser: User): Promise<string> {
    return await this.usersRepository.updateUser(id, updateUser);
  }

  async deleteUserService(id: string): Promise<string> {
    return await this.usersRepository.deleteUser(id);
  }
}
