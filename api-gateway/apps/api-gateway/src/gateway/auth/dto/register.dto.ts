import { Role } from '@app/common';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
export class RegisterDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEnum(Role)
  @IsNotEmpty()
  role: Role;
}
