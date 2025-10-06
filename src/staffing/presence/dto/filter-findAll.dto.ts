import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
} from 'class-validator';
import { Type } from 'class-transformer';

import { PaginationDto, PRESENCE_REASON, ToBoolean } from '../../../common';

export class FilterFindAllPresenceDto extends PaginationDto {
  @ApiProperty({ type: Number })
  @IsNumber()
  @IsOptional()
  @IsPositive()
  employeeId?: number;

  @ApiProperty({ type: Number })
  @IsNumber()
  @IsOptional()
  @IsPositive()
  staffId?: number;

  @ApiProperty({ type: Number })
  @IsNumber()
  @IsOptional()
  @IsPositive()
  projectId?: number;

  @ApiProperty({ type: Number })
  @IsNumber()
  @IsOptional()
  @IsPositive()
  headquarterId?: number;

  @ApiProperty({ type: Date })
  @IsOptional()
  @IsDate()
  startDate?: Date;

  @ApiProperty({ type: Date })
  @IsOptional()
  @IsDate()
  endDate?: Date;

  @ApiProperty({ enum: PRESENCE_REASON })
  @IsOptional()
  @IsEnum(PRESENCE_REASON)
  reason?: PRESENCE_REASON;
}

export class FindStaffPresenceDto {
  @ApiProperty({ type: Date, required: true, description: 'Date of presence' })
  @IsDate()
  @IsNotEmpty()
  date: Date;

  @ApiProperty({
    type: Number,
    required: true,
    description: 'Id of headquarter',
  })
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  headquarter: number;

  @ApiProperty({ type: Boolean, required: false, default: false })
  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  @ToBoolean('asistence')
  asistence?: boolean = false;
}
