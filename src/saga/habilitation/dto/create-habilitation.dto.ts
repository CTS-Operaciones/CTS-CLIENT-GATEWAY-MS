import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';
import { Timestamp } from 'typeorm';
export class CreateHabilitationDto {
  @ApiProperty({ type: Number, description: 'Date' })
  @IsDate()
  @IsNotEmpty()
  fecha: Timestamp;

  @ApiProperty({ type: Number, description: 'Name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: Number, description: 'Observations' })
  @IsString()
  @IsNotEmpty()
  observations: string;

  @ApiProperty({ type: Number, description: 'Project id' })
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  project_id: number;

  @ApiProperty({ type: Number, description: '' })
  @IsBoolean()
  isRed: boolean;
  @IsBoolean()
  isLuz: boolean;
  @IsBoolean()
  isExtra: boolean;
  @IsString()
  singCliente: string;
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  admissionsDischarge: number;
}
