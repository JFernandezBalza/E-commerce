import {
  IsEmail,
  IsEmpty,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';
import { MatchPassword } from 'src/decorators/matchPassword';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @MaxLength(50)
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(15)
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%?&]{8,15}$/,
    {
      message:
        'La contraseña debe contener entre 8 y 15 caracteres, al menos una letra mayúscula, una letra minúscula, un número y un carácter especial',
    },
  )
  password: string;

  @IsNotEmpty()
  @Validate(MatchPassword, [`password`])
  passwordConfirm: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  address: string;

  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  phone: number;

  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  country?: string;

  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  city?: string;

  @IsEmpty()
  isAdmin?: boolean;
}
