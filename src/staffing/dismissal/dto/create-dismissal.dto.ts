import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { IDismissalCreate } from '../../../common';

export class CreateDismissalDto implements IDismissalCreate {
  @ApiProperty({ type: Number, description: 'Staff id' })
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  employee: number;

  @ApiProperty({ type: String, description: 'Reason' })
  @IsNotEmpty()
  @IsString()
  reason: string;

  @ApiProperty({ type: Date, description: 'Date of dismissal' })
  @IsDate()
  @IsNotEmpty()
  date: Date;

  @ApiProperty({ type: String, required: false, description: 'Comment' })
  @IsString()
  @IsOptional()
  comment?: string;
}
