import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';
import { ASSIGNMENT_STATUS, ToBoolean } from 'src/common';
export class CreateAssignmentDto {
  @ApiProperty({ type: String, description: 'Date of the assignment' })
  @IsString()
  @IsNotEmpty()
  date: string;

  @ApiProperty({ type: String, description: 'comment of the assignment' })
  @IsString()
  comments: string;

  @ApiProperty({ type: Number, description: 'Id of the project' })
  @IsNumber()
  @IsPositive()
  project_id: number;

  @ApiProperty({ type: Number, description: 'I of the user' })
  @IsNumber()
  @IsPositive()
  user_id: number;

  @ApiProperty({ enum: ASSIGNMENT_STATUS })
  @IsNotEmpty()
  @IsEnum(ASSIGNMENT_STATUS)
  type: ASSIGNMENT_STATUS = ASSIGNMENT_STATUS.ASIGNACION;

  @ApiProperty({ type: Boolean, description: 'is preassignment' })
  @IsBoolean()
  @IsNotEmpty()
  @Type(() => Boolean)
  @ToBoolean('is_preassignment')
  is_preassignment: boolean = false;
}
