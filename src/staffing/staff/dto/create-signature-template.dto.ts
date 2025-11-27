import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
} from 'class-validator';

import { ICreateSignatureTemplate, REPORT_TYPE } from '../../../common';

export class CreateSignatureTemplateDto
  implements ICreateSignatureTemplate
{
  @ApiProperty({
    enum: REPORT_TYPE,
    description: 'Type of document/report',
    example: REPORT_TYPE.VACATIONS,
  })
  @IsEnum(REPORT_TYPE)
  @IsNotEmpty()
  report_type: REPORT_TYPE;

  @ApiProperty({
    type: Number,
    description: 'Order of the signature in the document',
    example: 1,
  })
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  order: number;

  @ApiProperty({
    type: Number,
    description: 'Id of Type Signature (role: Solicitante, Jefe inmediato, etc.)',
  })
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  type_signature_id: number;

  @ApiProperty({
    type: Boolean,
    description: 'Indicates if it is the signature of the direct boss',
    required: false,
    default: false,
  })
  @IsBoolean()
  @IsOptional()
  isBossSignature?: boolean;

  @ApiProperty({
    type: Number,
    description: 'Id of Position (optional, for position-based signatures)',
    required: false,
  })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  position_id?: number;
}

