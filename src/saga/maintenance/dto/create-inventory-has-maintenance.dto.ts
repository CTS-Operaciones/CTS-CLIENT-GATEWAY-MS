import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateHasMaintenanceDto {
  @ApiProperty({ type: Number, required: true })
  @IsNumber()
  idActa: number;

  @ApiProperty({ type: [Number], required: true })
  @IsArray()
  inventory: number[];

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @IsString()
  observations?: string;
}
