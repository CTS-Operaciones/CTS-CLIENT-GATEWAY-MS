import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

import { ICreateSignature } from '../../../common';

export class CreateSignatureDto implements ICreateSignature {
  @ApiProperty({ type: Number, description: 'Id of Staff that signs' })
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  staff_id: number;

  @ApiProperty({
    type: Number,
    description: 'Id of Signature Template to fulfill',
  })
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  signature_template_id: number;

  @ApiProperty({
    type: Number,
    description: 'Id of the document record (e.g., vacations.id)',
  })
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  reference_id: number;

  @ApiProperty({
    type: String,
    description: 'Name of the table of the document (e.g., "vacations")',
    example: 'vacations',
  })
  @IsString()
  @IsNotEmpty()
  reference_table: string;
}
