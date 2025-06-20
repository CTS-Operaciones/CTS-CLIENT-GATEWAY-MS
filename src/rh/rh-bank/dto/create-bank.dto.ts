import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { Transform } from 'class-transformer';

import { IBank } from '../../../common';

export class CreateBankDto implements IBank {
  @ApiProperty({ type: String, description: 'Name of the bank' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @Transform(({ value }) => value.toUpperCase())
  name: string;
}
