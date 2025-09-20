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

  @ApiProperty({ type: Boolean, description: 'Boolean isRed' })
  @IsBoolean()
  isRed: boolean;
  @ApiProperty({ type: Boolean, description: 'Boolean isLuz' })
  @IsBoolean()
  isLuz: boolean;
  @ApiProperty({ type: Boolean, description: 'Boolean isExtra' })
  @IsBoolean()
  isExtra: boolean;
  @ApiProperty({ type: String, description: 'Signature' })
  @IsString()
  singCliente: string;
  @ApiProperty({ type: Number, description: 'id of the admissions discharge' })
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  admissionsDischarge: number;
}
