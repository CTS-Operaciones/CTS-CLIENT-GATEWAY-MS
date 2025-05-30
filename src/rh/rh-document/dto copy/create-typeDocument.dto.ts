import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

import { ITypeDocument } from '../../../common';

export class CreateTypeDocumentDto implements ITypeDocument {
  @ApiProperty({ type: String, description: 'Name of the type document' })
  @IsString()
  @IsNotEmpty()
  type: string;
}
