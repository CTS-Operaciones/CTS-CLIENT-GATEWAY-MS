import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
} from 'class-validator';
import { Type } from 'class-transformer';
import { IPaginateFilter, IPagination } from '../interfaces';
import { STATUS, STATUS_EMPLOYEE, STATUS_PROJECT } from '../constants';
import { ToBoolean } from '../decorators/toBoolean.decorator';

export class PaginationDto implements IPagination {
  @ApiProperty({
    required: false,
    default: 1,
    type: Number,
    description: 'Page number',
  })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  page?: number = 1;

  @ApiProperty({
    required: false,
    default: 10,
    type: Number,
    description: 'Limit for each page',
  })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  limit?: number = 10;

  @ApiProperty({
    required: false,
    default: false,
    type: Boolean,
    description: 'Get all data',
  })
  @IsBoolean({ always: true })
  @IsOptional()
  @Type(() => Boolean)
  @ToBoolean('all')
  all?: boolean = false;
}

export class PaginationRelationsDto extends PaginationDto {
  @ApiProperty({
    required: false,
    default: false,
    type: Boolean,
    description: 'Get data with relations',
  })
  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  @ToBoolean('relations')
  relations?: boolean = false;
}

export class RelationsDto {
  @ApiProperty({
    required: false,
    default: false,
    type: Boolean,
    description: 'Get data with relations',
  })
  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  @ToBoolean('relations')
  relations?: boolean = false;
}

export class PaginationFilterStatusDto<T>
  extends PaginationRelationsDto
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

export class PaginationFilterProjectStatusDto<T>
  extends PaginationRelationsDto
  implements IPaginateFilter<T>
{
  @ApiProperty({
    required: false,
    enum: [...Object.values(STATUS_PROJECT)],
  })
  @IsEnum([...Object.values(STATUS_PROJECT)])
  @IsOptional()
  status?: T extends { status: infer U } ? U : never;
}
