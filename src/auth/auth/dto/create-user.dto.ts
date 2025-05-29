import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';
import { ICreateUser } from '../../../common';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto implements ICreateUser {
  @ApiProperty({ type: String, description: 'Username of the user' })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  username: string;

  @ApiProperty({ type: String, description: 'Email of the user' })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    type: String,
    description: 'Password of the user',
    minLength: 6,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty({ type: Number, description: 'Role id of the user' })
  @IsNotEmpty()
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  role_id: number;
}
