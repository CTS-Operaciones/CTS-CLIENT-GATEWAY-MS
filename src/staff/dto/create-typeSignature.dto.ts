import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

import { ICreateTypeSignature } from '../../common';

export class CreateTypeSignatureDto implements ICreateTypeSignature {
  @ApiProperty({
    type: String,
    description: 'Name of the type signature',
    example: 'Solicitante',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
