import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ILogin } from '../../../common';

export class LoginDto implements ILogin {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
