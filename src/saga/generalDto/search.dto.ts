
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { MAITENANCE_TYPE } from 'src/common';

export class SearchDto {
  @ApiProperty({ type: Number, description: 'Sede Id', required: false })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  project_id?: number;

  @ApiProperty({ type: String, description: 'Date Init', required: false })
  @IsString()
  @IsOptional()
  @Type(() => String)
  date_init?: String;
  @ApiProperty({ type: String, description: 'Date End', required: false })
  @IsString()
  @IsOptional()
  @Type(() => String)
  date_end?: String;

  @ApiProperty({ type: Number, description: 'User id', required: false })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  user_id?: number;
}

export class searchMaintenanceDto extends SearchDto {
  @ApiProperty({
    type: String,
    description: 'Description of the maintenance',
    required: false,
  })
  @IsString()
  @IsOptional()
  @Type(() => String)
  description?: String;

  @ApiProperty({
    type: String,
    description: 'Observations of the maintenance',
    required: false,
  })
  @IsString()
  @IsOptional()
  @Type(() => String)
  observations?: String;

  @ApiProperty({
    enum: MAITENANCE_TYPE,
    description: 'Type of the maintenance or null',
  })
  @IsOptional()
  @IsEnum(MAITENANCE_TYPE)
  maintenanceType?: MAITENANCE_TYPE = MAITENANCE_TYPE.PREVENTIVO;
}
