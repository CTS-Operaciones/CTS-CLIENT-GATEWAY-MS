import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';
import { ICreateUser } from '../../common';

export class CreateUserDto implements ICreateUser {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  username: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  role_id: number;
}
