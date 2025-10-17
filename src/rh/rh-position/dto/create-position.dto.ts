import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

import {
  ICreatePosition,
  ISalary,
  PaginationRelationsDto,
  ToBoolean,
} from '../../../common';

export class CreateSalaryDto implements ISalary {
  @ApiProperty({ type: Number, description: 'Amount of the position' })
  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  @Min(0)
  amount: number;

  @ApiProperty({
    type: String,
    description: 'Amount in words of the position',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  salary_in_words: string;
}

export class CreatePositionDto implements ICreatePosition {
  @ApiProperty({ type: String, description: 'Name of the position' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @ApiProperty({ type: () => CreateSalaryDto, description: 'Salary details' })
  @ValidateNested()
  @Type(() => CreateSalaryDto)
  @IsNotEmpty()
  salary: CreateSalaryDto;

  @ApiProperty({
    type: Number,
    description: 'Department id of the position',
  })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  department_id?: number = undefined;

  @ApiProperty({
    type: Number,
    description: 'Id of the parent position',
    required: false,
  })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  parent?: number = undefined;

  @ApiProperty({
    type: Boolean,
    description: 'Indicates if the position requires a boss',
    required: false,
    default: false,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsBoolean()
  @Type(() => Boolean)
  @ToBoolean('required_boss')
  required_boss?: boolean = false;

  @ApiProperty({
    type: Boolean,
    description: 'Indicates if the position is external',
    required: false,
    default: false,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsBoolean()
  @Type(() => Boolean)
  @ToBoolean('isExternal')
  isExternal?: boolean = false;
}

export class FilterPositionDto extends PaginationRelationsDto {
  @ApiProperty({
    required: false,
    type: Boolean,
    description: 'Filter positions that are external',
  })
  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  @ToBoolean('isExternal')
  isExternal?: boolean;
}