import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';

import { ICreateExtension } from '../../../common';

export class CreateExtensionDto implements ICreateExtension {
  @ApiProperty({ type: Number, description: 'Number of expedients' })
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  number_expedients: number;

  @ApiProperty({ type: Date, description: 'Start date of the extension' })
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  start_date: Date;

  @ApiProperty({ type: Date, description: 'End date of the extension' })
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  end_date: Date;

  @ApiProperty({ type: Number, description: 'Project id' })
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  project_id: number;
}
