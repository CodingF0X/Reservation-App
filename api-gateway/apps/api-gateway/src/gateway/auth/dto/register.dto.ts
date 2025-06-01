import { Role } from '@app/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
export class RegisterDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    example: 'johndoe@gmail.com',
    description: 'Email of the user',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'password',
    description: 'Password of the user',
  })
  password: string;

  @IsEnum(Role)
  @IsNotEmpty()
  @ApiProperty({
    example: 'user',
    description: 'Role of the user',
  })
  role: Role;
}
