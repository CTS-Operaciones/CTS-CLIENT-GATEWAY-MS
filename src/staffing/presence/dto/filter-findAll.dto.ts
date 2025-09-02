import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
} from 'class-validator';

import { PaginationDto, PRESENCE_REASON } from '../../../common';

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
