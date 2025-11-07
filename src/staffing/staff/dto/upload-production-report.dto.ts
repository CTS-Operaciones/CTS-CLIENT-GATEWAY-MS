import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNotEmptyObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

import { FindStaffForProductionReportDto } from './find-staff.dto';

export class UploadedProductionFileDto {
  @IsString()
  @IsNotEmpty()
  originalname: string;

  @IsString()
  @IsNotEmpty()
  mimetype: string;

  @IsString()
  @IsNotEmpty()
  buffer: string; // Base64

  @IsString()
  @IsOptional()
  encoding?: string;
}

export class UploadProductionReportDto extends FindStaffForProductionReportDto {
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => UploadedProductionFileDto)
  file: UploadedProductionFileDto;
}
