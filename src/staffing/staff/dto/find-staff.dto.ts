import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
} from 'class-validator';

import { ToBoolean } from '../../../common';
import { CreateStaffDto } from './create-staff.dto';

export class FindStaffInHeadquarterDto {
  @ApiProperty({ type: Boolean, required: false, default: false })
  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  @ToBoolean('childrens')
  childrens?: boolean = false;

  @ApiProperty({ type: Boolean, required: false, default: false })
  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  @ToBoolean('position')
  position?: boolean = false;

  @ApiProperty({ type: Boolean, required: false, default: false })
  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  @ToBoolean('employees')
  employees?: boolean = false;
}

export class FindStaffInProjectDto extends FindStaffInHeadquarterDto {
  @ApiProperty({ type: Boolean, required: false, default: false })
  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  @ToBoolean('headquarter')
  headquarter?: boolean = false;

  @ApiProperty({ type: Boolean, required: false, default: false })
  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  @ToBoolean('tree')
  tree?: boolean = false;
}

export class FindBossForStaffDto extends OmitType(CreateStaffDto, [
  'parent',
  'employeeHasPositions',
] as const) {
  @ApiProperty({ type: Number })
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  position: number;
}
