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

  @ApiProperty({
    type: Boolean,
    description: 'Indicates if the position is for production report',
    required: false,
    default: false,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsBoolean()
  @Type(() => Boolean)
  @ToBoolean('forProductionReport')
  forProductionReport?: boolean = false;

  @ApiProperty({
    type: Number,
    description: 'Process order of the position',
    required: false,
    default: null,
  })
  @IsOptional()
  @IsNumber()
  processOrder?: number | null = null;

  @ApiProperty({
    type: Boolean,
    description: 'Indicates if the position is comulative',
    required: false,
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  @ToBoolean('isComulative')
  isComulative?: boolean = false;
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

  @ApiProperty({
    required: false,
    type: Boolean,
    description: 'Filter positions that are for production report',
  })
  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  @ToBoolean('forProductionReport')
  forProductionReport?: boolean;
}