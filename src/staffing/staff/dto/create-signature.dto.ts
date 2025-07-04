import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

import { ICreateSignature } from '../../../common';

export class CreateSignatureDto implements ICreateSignature {
  @ApiProperty({ type: Number, description: 'Id of Type Signature' })
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  type_signature: number;

  @ApiProperty({ type: Number, description: 'Id of Staff in one project' })
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  staff: number;
}
