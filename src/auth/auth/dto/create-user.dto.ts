import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { ICreateUser, IModuleForUser } from '../../../common';

class CreatePermissionModuleDto implements IModuleForUser {
  @ApiProperty({ type: Number, description: 'Module id of the user' })
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  module: number;

  @ApiProperty({ type: [Number], description: 'Permissions of the user' })
  @IsArray()
  @IsNotEmpty()
  permissions: number[];
}

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
  role: number;

  @ApiProperty({ type: [CreatePermissionModuleDto] })
  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreatePermissionModuleDto)
  modules: CreatePermissionModuleDto[];
}
