import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ASSIGNMENT_STATUS } from 'src/common';
export class CreateAssignmentDto {
  @ApiProperty({ type: String, description: 'Name of the assignment' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: String, description: 'Date of the assignment' })
  @IsString()
  @IsNotEmpty()
  date: string;

  @ApiProperty({ type: String, description: 'Hours of the assignment' })
  @IsString()
  @IsNotEmpty()
  hours: string;

  @ApiProperty({ type: String, description: 'Accessories of the assignment' })
  @IsString()
  accessories: string;

  @ApiProperty({ enum: ASSIGNMENT_STATUS })
  @IsString()
  @IsNotEmpty()
  @IsEnum(ASSIGNMENT_STATUS)
  type: ASSIGNMENT_STATUS;
}
