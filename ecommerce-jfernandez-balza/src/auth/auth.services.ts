import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersRepository } from '../users/users.repository';
import { CreateUserDto } from 'src/dtos/users.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}
  async signLogin(email: string, password: string) {
    const user = await this.userRepository.findUserByEmail(email);

    const isPasswordValidated = await bcrypt.compare(password, user?.password);
    if (!user || !isPasswordValidated) {
      throw new BadRequestException('Email o Password incorrectos');
    }
    const payload = {
      id: user.id,
      email: user.email,
      isAdmin: user.isAdmin,
    };
    console.log(`Generated token payload:`, payload);
    const token = this.jwtService.sign(payload, { expiresIn: '1h' });
    return {
      token,
      message: 'Usuario loggeado correctamente',
    };
  }
  async signupUser(user: Partial<CreateUserDto>) {
    const existingUser = await this.userRepository.findUserByEmail(user.email);

    if (existingUser) {
      throw new BadRequestException(
        `Usuario ya existente con ese correo electronico`,
      );
    }
    const hashedPassword = await bcrypt.hash(user.password, 10);
    if (!hashedPassword) {
      throw new BadRequestException(`Hubo un error para guardar la contraseña`);
    }
    const newUser = { ...user, password: hashedPassword };
    const saveUser = await this.userRepository.createUser(newUser);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWhithoutPassword } = saveUser;
    return userWhithoutPassword;
  }
}
