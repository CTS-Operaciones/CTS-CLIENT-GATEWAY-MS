import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';
import { ASSIGNMENT_STATUS } from 'src/common';
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
  @IsString()
  @IsNotEmpty()
  @IsEnum(ASSIGNMENT_STATUS)
  type: ASSIGNMENT_STATUS;
}
