import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ILogin } from '../../../common';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto implements ILogin {
  @ApiProperty({ type: String, description: 'Email of the user' })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  username: string;

  @ApiProperty({
    type: String,
    description: 'Password of the user',
    minLength: 6,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
