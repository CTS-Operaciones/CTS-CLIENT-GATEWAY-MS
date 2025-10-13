import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsArray,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

import {
  ICreateVacation,
  IDatesRange,
  PaginationDto,
  STATUS_VACATIONS_PERMISSION,
} from '../../../common';

export class DatesRangeDto implements IDatesRange {
  @ApiProperty({ type: Date, required: true })
  @IsNotEmpty()
  @IsDate()
  start: Date;

  @ApiProperty({ type: Date, required: true })
  @IsNotEmpty()
  @IsDate()
  end: Date;
}

export class CreateVacationDto implements ICreateVacation {
  @ApiProperty({ type: Number, required: true })
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  employee: number;

  @ApiProperty({ type: [DatesRangeDto], required: true })
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => DatesRangeDto)
  dateRange: DatesRangeDto[];

  @ApiProperty({ type: Number, required: true })
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
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

export class SetStatusOfVacationDto {
  @ApiProperty({ type: Number, required: true })
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  id: number;

  @ApiProperty({
    enum: STATUS_VACATIONS_PERMISSION,
    required: true,
  })
  @IsEnum(STATUS_VACATIONS_PERMISSION)
  @IsNotEmpty()
  status: STATUS_VACATIONS_PERMISSION;
}


export class FindHistoryByEmployeeDto extends PaginationDto {
  @ApiProperty({
    type: Boolean,
    required: false,
    default: false,
  })
  @IsOptional()
  @IsNotEmpty()
  relations?: boolean = false;
}
