import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';

import { ICreateProject } from '../../../common';

export class CreateProjectDto implements ICreateProject {
  @ApiProperty({ type: String, description: 'Contract number of the project' })
  @IsString()
  @IsNotEmpty()
  contract_number: string;

  @ApiProperty({ type: String, description: 'Name of the project' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: String, description: 'Description of the project' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ type: Date, description: 'Start date of the project' })
  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  start_date: Date;

  @ApiProperty({ type: Date, description: 'End date of the project' })
  @IsDate()
  @IsNotEmpty()
  end_date: Date;

  @ApiProperty({ type: Number, description: 'Number of expedients' })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  number_expedients: number;

  @ApiProperty({ type: Number, description: 'Number of productions days' })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  productions_days: number;

  @ApiProperty({ type: Number, description: 'Sum of productions' })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  sum_productions: number;
}
