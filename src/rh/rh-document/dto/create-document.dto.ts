import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';

import { ISendDocument, IFileSend } from '../../../common';
import { Type } from 'class-transformer';

export class CreateDocumentDto implements ISendDocument {
  @ApiProperty({
    type: String,
    description: 'Objetive of the document with number type',
  })
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => FileSendDto)
  data: FileSendDto[];

  @ApiProperty({
    type: Number,
    description: 'Employee id of the document',
  })
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  employee: number;
}

export class FileSendDto implements IFileSend {
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  type: number;

  @IsString()
  @IsNotEmpty()
  file: string;
}
