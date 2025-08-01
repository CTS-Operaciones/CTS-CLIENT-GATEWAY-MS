import { ApiProperty } from '@nestjs/swagger';
import {
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

import { ICreatePosition, ISalary } from '../../../common';

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
}