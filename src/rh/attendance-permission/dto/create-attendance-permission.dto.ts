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

import {
  ATTENDANCE_PERMISSION_TYPE,
  STATUS_VACATIONS_PERMISSION,
  ICreateAttendancePermission,
} from '../../../common';

export class CreateAttendancePermissionDto
  implements ICreateAttendancePermission
{
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

  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  @IsString()
  reason: string;

  @ApiProperty({
    enum: STATUS_VACATIONS_PERMISSION,
    required: false,
    default: STATUS_VACATIONS_PERMISSION.PENDING,
  })
  @IsEnum(STATUS_VACATIONS_PERMISSION)
  @IsOptional()
  status: STATUS_VACATIONS_PERMISSION = STATUS_VACATIONS_PERMISSION.PENDING;

  @ApiProperty({ type: Number, required: true })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  requested_at: number;
}
