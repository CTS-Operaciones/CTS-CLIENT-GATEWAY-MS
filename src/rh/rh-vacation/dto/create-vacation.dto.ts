import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

import { ICreateVacation, STATUS_VACATIONS_PERMISSION } from '../../../common';

export class CreateVacationDto implements ICreateVacation {
  @ApiProperty({ type: Number, required: true })
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  employee: number;

  @ApiProperty({ type: Date, required: true })
  @IsNotEmpty()
  @IsDate()
  startDate: Date;

  @ApiProperty({ type: Date, required: true })
  @IsNotEmpty()
  @IsDate()
  endDate: Date;

  @ApiProperty({ type: Number, required: true })
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  requested_day: number;

  @ApiProperty({
    enum: STATUS_VACATIONS_PERMISSION,
    required: false,
    default: STATUS_VACATIONS_PERMISSION.PENDING,
  })
  @IsEnum(STATUS_VACATIONS_PERMISSION)
  @IsNotEmpty()
  status: STATUS_VACATIONS_PERMISSION = STATUS_VACATIONS_PERMISSION.PENDING;

  @ApiProperty({
    type: String,
    required: false,
    default: '',
  })
  @IsString()
  @IsOptional()
  reason?: string;

  @ApiProperty({
    type: String,
    required: false,
    default: '',
  })
  @IsString()
  @IsOptional()
  comment?: string;
}
