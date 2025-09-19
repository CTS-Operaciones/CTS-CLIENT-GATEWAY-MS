import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TYPE_RESOURCE } from 'src/common';

export class CreateResourceDto {
  @ApiProperty({ type: String, description: 'Name of the resource' })
  @IsString()
  @IsNotEmpty()
  name: string;
  @ApiProperty({ type: String, description: 'Description of the resource' })
  @IsString()
  @IsNotEmpty()
  description: string;
  @ApiProperty({ type: Number, description: 'Quantity of the resource' })
  @IsNumber()
  @IsNotEmpty()
  quatity: number;
  @ApiProperty({ type: String, description: 'Especifications of the resource' })
  @IsString()
  @IsNotEmpty()
  especifications: string;
  @ApiProperty({
    type: Number,
    description: 'Clasification id of the resou rce',
  })
  @IsPositive()
  @IsNotEmpty()
  @IsNumber()
  clasificationId: number;
  @ApiProperty({ type: Number, description: 'Model id of the resource' })
  @IsPositive()
  @IsNotEmpty()
  @IsNumber()
  modelId: number;
  @ApiProperty({
    enum: TYPE_RESOURCE,
    description: 'Type of the resource',
  })
  @IsEnum(TYPE_RESOURCE)
  @IsNotEmpty()
  type: string;
}
