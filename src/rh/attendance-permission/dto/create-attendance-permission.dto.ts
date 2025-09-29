import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

import {
  ATTENDANCE_PERMISSION_TYPE,
  STATUS_VACATIONS_PERMISSION,
  ICreateAttendancePermission,
  ToBoolean,
  PaginationRelationsDto,
} from '../../../common';
import { Type } from 'class-transformer';

export class CreateAttendancePermissionDto
  implements ICreateAttendancePermission
{
  @ApiProperty({ type: Number, required: true })
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  employee_id: number;

  @ApiProperty({ enum: ATTENDANCE_PERMISSION_TYPE, required: true })
  @IsEnum(ATTENDANCE_PERMISSION_TYPE)
  @IsNotEmpty()
  permission_type: ATTENDANCE_PERMISSION_TYPE;

  @ApiProperty({ type: Date, required: true, example: '2025/01/01' })
  @IsNotEmpty()
  @IsDate()
  start_date: Date;

  @ApiProperty({ type: Date, required: true, example: '2025/01/01' })
  @IsNotEmpty()
  @IsDate()
  end_date: Date;

  @ApiProperty({ type: String, required: false, example: '08:00:00' })
  @IsOptional()
  @IsString()
  time_start?: string;

  @ApiProperty({ type: String, required: false, example: '17:00:00' })
  @IsOptional()
  @IsString()
  time_end?: string;

  @ApiProperty({ type: Boolean, required: false, example: false })
  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  @ToBoolean('required_justified')
  required_justified: boolean = false;

  @ApiProperty({ type: Boolean, required: false, example: false })
  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  @ToBoolean('required_presences')
  required_presences: boolean = false;

  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  @IsString()
  reason: string;

  @ApiProperty({ type: Number, required: true })
  @IsNotEmpty()
  @IsNumber()
  requested_at: number = 0;
}

export class SetStatusOfPermissionDto {
  @ApiProperty({ type: Number, required: true })
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  id: number;

  @ApiProperty({ enum: STATUS_VACATIONS_PERMISSION, required: true })
  @IsEnum(STATUS_VACATIONS_PERMISSION)
  @IsNotEmpty()
  status: STATUS_VACATIONS_PERMISSION;

  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  @IsString()
  approved_by: string;

  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  approved_at: string;
}

export class AddJustificationDto {
  @ApiProperty({ type: Number, required: true })
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  id: number;

  @ApiProperty({ type: Boolean, required: true })
  @IsBoolean()
  @IsNotEmpty()
  @Type(() => Boolean)
  @ToBoolean('justification')
  justification: boolean;
}

export class FilterDateDto extends PaginationRelationsDto {
  @ApiProperty({ type: Date })
  @IsDate()
  @Type(() => Date)
  startDate?: Date;

  @ApiProperty({ type: Date })
  @IsDate()
  @Type(() => Date)
  endDate?: Date;
}
