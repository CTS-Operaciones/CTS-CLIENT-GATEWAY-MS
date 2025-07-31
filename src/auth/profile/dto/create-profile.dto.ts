import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

import {
  IAddModuleToProfile,
  ICreateProfile,
  ToBoolean,
} from '../../../common';
import { ApiProperty } from '@nestjs/swagger';

export class AddModuleToProfileDto implements IAddModuleToProfile {
  @ApiProperty({
    type: Number,
    required: true,
    description: 'Id of the module',
  })
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  module: number;

  @ApiProperty({
    type: [Number],
    required: true,
    description: 'Ids of the permissions',
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsNumber({}, { each: true })
  permission: number[];
}

export class CreateProfileDto implements ICreateProfile {
  @ApiProperty({
    type: Boolean,
    required: false,
    description: 'Indicate if the profile is extended from another profile',
  })
  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  @ToBoolean('extends')
  extends: boolean;

  @ApiProperty({
    type: Number,
    required: false,
    description:
      'Id of the profile, is required if the extends property is true',
  })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  id: number;

  @ApiProperty({
    type: Boolean,
    required: false,
    description: 'Indicate if the profile is saved for use recurrently',
  })
  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  @ToBoolean('saved')
  saved: boolean;

  @ApiProperty({
    type: String,
    required: false,
    description:
      'Name of the profile, is required if the saved property is true',
  })
  @IsString()
  @IsOptional()
  name: string = '';

  @ApiProperty({
    type: [AddModuleToProfileDto],
    required: true,
    description: 'Permissions to add to the profile',
  })
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => AddModuleToProfileDto)
  permissions: AddModuleToProfileDto[];
}
