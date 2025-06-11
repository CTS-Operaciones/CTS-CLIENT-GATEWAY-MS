import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPhoneNumber,
  IsPositive,
  IsPostalCode,
  IsString,
} from 'class-validator';
import { ICreateHeadquarter, STATUS_PROJECT } from '../../../common';
import { ApiProperty } from '@nestjs/swagger';

export class CreateHeadquartersDto implements ICreateHeadquarter {
  @ApiProperty({ type: String, description: 'Name of the headquarters' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: String, description: 'Address of the headquarters' })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({ type: String, description: 'City of the headquarters' })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({ type: String, description: 'Code postal of the headquarters' })
  @IsNotEmpty()
  @IsPostalCode('MX')
  postal_code: number;

  @ApiProperty({ type: String, description: 'Phone of the headquarters' })
  @IsString()
  @IsPhoneNumber()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ type: Number, description: 'Number of productions days' })
  @IsNotEmpty()
  @IsNumber()
  production_days: number;

  @ApiProperty({ type: Number, description: 'Number of expedients' })
  @IsNotEmpty()
  @IsNumber()
  number_expedients: number;

  @ApiProperty({ type: Number, description: 'Sum of productions' })
  @IsNotEmpty()
  @IsNumber()
  sum_productions: number;

  @ApiProperty({ enum: STATUS_PROJECT, description: 'Status of the project' })
  @IsNotEmpty()
  @IsEnum(STATUS_PROJECT)
  status: STATUS_PROJECT;

  @ApiProperty({ type: Number, description: 'Project id' })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  project: number;
}
