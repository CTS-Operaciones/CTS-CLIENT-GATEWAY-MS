import {
  IsArray,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPhoneNumber,
  IsPositive,
  IsString,
  ValidateNested,
} from 'class-validator';
import {
  ICreateHeadquarter,
  IQuotaEmployeePosition,
  STATUS_PROJECT,
} from '../../../common';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class AddQuotaEmployeePosition implements IQuotaEmployeePosition {
  @ApiProperty({ type: Number, description: 'Maximum number of employees' })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  max_employee: number;

  @ApiProperty({ type: Number, description: 'Position ID' })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  position_id: number;
}

export class CreateHeadquartersDto implements ICreateHeadquarter {
  @ApiProperty({ type: String, description: 'Name of the headquarters' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: String, description: 'Address of the headquarters' })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({ type: String, description: 'City of the headquarters' })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({ type: String, description: 'Code postal of the headquarters' })
  @IsNotEmpty()
  @IsString()
  postal_code: string;

  @ApiProperty({ type: String, description: 'Phone of the headquarters' })
  @IsString()
  @IsPhoneNumber('MX')
  @IsNotEmpty()
  phone: string;

  @ApiProperty({
    type: Date,
    description: 'Start date of the project in the headquarters',
  })
  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  start_date: Date;

  @ApiProperty({
    type: Date,
    description: 'End date of the project in the headquarters',
  })
  @IsDate()
  @IsNotEmpty()
  end_date: Date;

  @ApiProperty({ type: Number, description: 'Number of productions days' })
  @IsNotEmpty()
  @IsNumber()
  production_days: number;

  @ApiProperty({ type: Number, description: 'Number of expedients' })
  @IsNotEmpty()
  @IsNumber()
  number_expedients: number;

  @ApiProperty({ type: Number, description: 'Sum of productions' })
  @IsNotEmpty()
  @IsNumber()
  sum_productions: number;

  @ApiProperty({ enum: STATUS_PROJECT, description: 'Status of the project' })
  @IsNotEmpty()
  @IsEnum(STATUS_PROJECT)
  status: STATUS_PROJECT;

  @ApiProperty({ type: Number, description: 'Project id' })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  project: number;

  @ApiProperty({
    type: [AddQuotaEmployeePosition],
    description: 'Quota employee positions',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AddQuotaEmployeePosition)
  quotaEmployeePosition: AddQuotaEmployeePosition[];
}
