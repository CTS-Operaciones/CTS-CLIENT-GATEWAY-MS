import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  Matches,
} from 'class-validator';

import {
  PRESENCE_REASON,
  ICreatePresence,
  ICheckInPresence,
  ICheckOutPresence,
} from '../../../common';

export class CreatePresenceDto implements ICreatePresence {
  @ApiProperty({ type: Number, required: true })
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  staff: number;

  @ApiProperty({ type: Date, required: true })
  @IsNotEmpty()
  @IsDate()
  date: Date;
}

export class CheckInDto extends CreatePresenceDto implements ICheckInPresence {
  @ApiProperty({ type: String, example: '08:00:00', required: false })
  @IsOptional()
  @Matches(/^([0-1]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/, {
    message: 'check_in must be a valid time in HH:mm or HH:mm:ss format',
  })
  check_in: string;

  @ApiProperty({ enum: PRESENCE_REASON, required: false })
  @IsEnum(PRESENCE_REASON)
  @IsOptional()
  reason: PRESENCE_REASON = PRESENCE_REASON.PRESENCE;
}

export class CheckOutDto implements ICheckOutPresence {
  @ApiProperty({ type: String, example: '14:00:00', required: false })
  @IsOptional()
  @Matches(/^([0-1]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/, {
    message: 'check_out must be a valid time in HH:mm or HH:mm:ss format',
  })
  check_out: string;
}
