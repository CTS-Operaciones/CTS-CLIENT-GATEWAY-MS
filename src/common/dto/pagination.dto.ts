import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
} from 'class-validator';
import { Type } from 'class-transformer';
import { IPaginateFilter, IPagination } from '../interfaces';
import { ApiProperty } from '@nestjs/swagger';
import { STATUS, STATUS_EMPLOYEE } from '../constants';

export class PaginationDto implements IPagination {
  @IsNumber()
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  page?: number = 1;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  limit?: number = 10;

  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  all?: boolean = false;
}

export class PaginationFilterStatusDto<T>
  extends PaginationDto
  implements IPaginateFilter<T>
{
  @ApiProperty({
    required: false,
    enum: [...Object.values(STATUS), ...Object.values(STATUS_EMPLOYEE)],
  })
  @IsEnum([...Object.values(STATUS), ...Object.values(STATUS_EMPLOYEE)])
  @IsOptional()
  status?: T extends { status: infer U } ? U : never;
}
