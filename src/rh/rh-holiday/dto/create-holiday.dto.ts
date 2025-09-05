import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { IHolidays } from '../../../common';
import { ApiProperty } from '@nestjs/swagger';

export class CreateHolidayDto implements IHolidays {
  @ApiProperty({ type: Date, required: true })
  @IsDate()
  @IsNotEmpty()
  holiday_date: Date;

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @IsString()
  description?: string | undefined = '';
}
