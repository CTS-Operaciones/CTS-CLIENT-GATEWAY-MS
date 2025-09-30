import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
} from 'class-validator';

export class FindPayrollDto {
  @ApiProperty({ type: Number, required: false })
  @IsNumber()
  @IsOptional()
  @IsPositive()
  project_id?: number;

  @ApiProperty({ type: Number, required: false })
  @IsNumber()
  @IsOptional()
  @IsPositive()
  headquarter_id?: number;

  @ApiProperty({ type: Number, required: false })
  @IsNumber()
  @IsOptional()
  @IsPositive()
  employee_id?: number;

  @ApiProperty({ type: Date, required: true })
  @IsDate()
  @IsNotEmpty()
  start_date: Date;

  @ApiProperty({ type: Date, required: true })
  @IsDate()
  @IsNotEmpty()
  end_date: Date;
}
