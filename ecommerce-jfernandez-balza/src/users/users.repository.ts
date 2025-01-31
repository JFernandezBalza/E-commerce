import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { CreateUserDto } from 'src/dtos/users.dto';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async getUsers(): Promise<Omit<User, `password`>[]> {
    const users = await this.usersRepository.find();

    const userOutPass = users.map((user) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...cleanUser } = user;
      return cleanUser;
    });
    return userOutPass;
  }
  async getUserById(id: string): Promise<Partial<User>> {
    const userFound = await this.usersRepository.findOne({
      where: { id },
      relations: {
        orders: true,
      },
    });

    if (!userFound)
      throw new NotFoundException(`No se encontro el usuario con ID ${id}`);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, isAdmin, ...cleanUser } = userFound;

    return cleanUser;
  }
  async createUser(user: Partial<CreateUserDto>): Promise<User> {
    const newUser = await this.usersRepository.save(user);
    console.log(newUser);
    return newUser;
  }
  async updateUser(id: string, user: CreateUserDto): Promise<string> {
    await this.usersRepository.update(id, user);

    const updateUser = await this.usersRepository.findOneBy({ id });
    return updateUser.id;
  }

  async deleteUser(id: string): Promise<string> {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException(`No se encontro el usuario con ID ${id}`);
    }
    await this.usersRepository.remove(user);
    return user.id;
  }

  async findUserByEmail(email: string) {
    return await this.usersRepository.findOne({ where: { email } });
  }
}
