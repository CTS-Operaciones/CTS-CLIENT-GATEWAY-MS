import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';
import { STATUS_ADMISSION } from 'src/common/';
export class CreateAdmissionsDischargeDto {
  @ApiProperty({ type: String, description: 'Reason of the admission' })
  @IsString()
  @IsNotEmpty()
  reason: string;

  @ApiProperty({ type: String, description: 'Observations of the admission' })
  @IsNotEmpty()
  @IsString()
  observations: string;

  @ApiProperty({ type: String, description: 'Date of the admission' })
  @IsString()
  date: string;

  @ApiProperty({ type: String, description: 'Id of the project(Sede)' })
  @IsPositive()
  @IsNotEmpty()
  @IsNumber()
  project_id: number;

  @ApiProperty({ type: String, description: 'User id' })
  @IsPositive()
  @IsNotEmpty()
  @IsNumber()
  user_id: number;

  @ApiProperty({ enum: STATUS_ADMISSION })
  @IsEnum(STATUS_ADMISSION)
  type: STATUS_ADMISSION;
}
