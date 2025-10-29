import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Min,
  IsString,
} from 'class-validator';

export class CreateBulkDismissalDto {
  @ApiProperty({
    type: [Number],
    description: 'Array of employee IDs',
    example: [1, 2, 3],
  })
  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @IsNumber({}, { each: true })
  @Min(1, { each: true })
  employees: number[];

  @ApiProperty({ type: String, description: 'Reason' })
  @IsNotEmpty()
  @IsString()
  reason: string;

  @ApiProperty({ type: Date, description: 'Date of dismissal', example: '2025/01/01' })
  @IsDate()
  @IsNotEmpty()
  date: Date;

  @ApiProperty({ type: String, required: false, description: 'Comment' })
  @IsString()
  @IsOptional()
  comment?: string;
}

