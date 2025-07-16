import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { ICreateTypeContract } from '../../../common';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTypeContractDto implements ICreateTypeContract {
  @ApiProperty({
    type: 'string',
    description: 'Name of the contract type',
  })
  @IsString()
  @IsNotEmpty()
  type: string;

  @ApiProperty({
    type: 'boolean',
    description:
      'Indicates if the contract type is processed for update employees of projects',
  })
  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  @Transform(({ obj }) => obj?.isAutomatic === 'true')
  isAutomatic: boolean;
}
