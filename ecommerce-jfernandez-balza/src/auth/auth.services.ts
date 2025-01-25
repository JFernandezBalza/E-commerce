import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from '../users/users.repository';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UsersRepository) {}
  async signLogin(auth: { email: string; password: string }) {
    const { email, password } = auth;
    const user = await this.userRepository.foundEmail(email);
    if (!user) {
      throw new NotFoundException('Email o Password incorrectos');
    }
    if (user.password !== password) {
      throw new NotFoundException('Email o Password incorrectos');
    }
    return `Inicio de sesión exitoso`;
  }
}
