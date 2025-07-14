import { ApiProperty } from '@nestjs/swagger';

import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';
import { IAddPermission, ICreateUser } from '../../../common';

export class CreateUserDto implements ICreateUser {
  @ApiProperty({ type: Number, description: 'Id of the email of the user' })
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  email: number;
}

export class AddRoleProfileDto implements IAddPermission {
  @ApiProperty({ type: Number, description: 'Id of the profile' })
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  profile: number;

  @ApiProperty({ type: Number, description: 'Id of the role' })
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  role: number;
}
