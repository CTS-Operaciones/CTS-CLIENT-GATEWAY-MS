
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

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
