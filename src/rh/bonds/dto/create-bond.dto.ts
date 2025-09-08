import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

import { IBondCreate, IDescriptionBond, ITypesBond } from '../../../common';

export class CreateBondDto implements IBondCreate {
  @ApiProperty({ type: Number, required: true })
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @Min(1)
  employee_id: number;

  @ApiProperty({ type: Date, required: true })
  @IsNotEmpty()
  @IsDate()
  date_assigned: Date;

  @ApiProperty({ type: Date, required: true })
  @IsNotEmpty()
  @IsDate()
  date_limit: Date;

  @ApiProperty({ type: Number, required: true })
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsNotEmpty()
  @IsPositive()
  @Min(0)
  amount: number;

  @ApiProperty({ type: Number, required: true })
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @Min(1)
  description_id: number;

  @ApiProperty({ type: Number, required: true })
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @Min(1)
  type_id: number;
}

export class CreateTypeBondDto implements ITypesBond {
  @ApiProperty({ type: String, required: true, maxLength: 100 })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  type: string;
}

export class CreateDescriptionBondDto implements IDescriptionBond {
  @ApiProperty({ type: String, required: true, maxLength: 100 })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  description: string;
}
