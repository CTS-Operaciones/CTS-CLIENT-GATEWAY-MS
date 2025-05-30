import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
} from 'class-validator';

import { ICreateDocument } from '../../../common';

export class CreateDocumentDto implements ICreateDocument {
  @ApiProperty({ type: String, description: 'Url of the file' })
  @IsString()
  @IsUrl()
  @IsNotEmpty()
  url_file: string;

  @ApiProperty({
    type: Number,
    description: 'Size of the file',
    required: false,
  })
  @IsNumber()
  @IsOptional()
  size?: number;

  @ApiProperty({ type: String, description: 'Name of the file' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: Number,
    description: 'Type of the document',
  })
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  type: number;

  @ApiProperty({
    type: Number,
    description: 'Employee id of the document',
  })
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  employee: number;
}
