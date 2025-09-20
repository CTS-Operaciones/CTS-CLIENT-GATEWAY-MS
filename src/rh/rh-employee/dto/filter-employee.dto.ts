import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
} from 'class-validator';
import {
  BLOOD_TYPE,
  GENDER,
  NACIONALITY_EMPLOYEE,
  PaginationFilterStatusEmployeeDto,
  STATUS_CIVIL,
  ToBoolean,
} from '../../../common';
import { ApiProperty } from '@nestjs/swagger';

export class FilterEnumsDto<T> extends PaginationFilterStatusEmployeeDto<T> {
  @ApiProperty({
    enum: [...Object.values(NACIONALITY_EMPLOYEE)],
    required: false,
  })
  @IsEnum([...Object.values(NACIONALITY_EMPLOYEE)])
  @IsOptional()
  nacionality?: T extends { nacionality: infer U } ? U : never;

  @ApiProperty({ enum: [...Object.values(BLOOD_TYPE)], required: false })
  @IsEnum([...Object.values(BLOOD_TYPE)])
  @IsOptional()
  blood?: T extends { blood: infer U } ? U : never;

  @ApiProperty({ enum: [...Object.values(GENDER)], required: false })
  @IsEnum([...Object.values(GENDER)])
  @IsOptional()
  gener?: T extends { blood: infer U } ? U : never;

  @ApiProperty({ enum: [...Object.values(STATUS_CIVIL)], required: false })
  @IsEnum([...Object.values(STATUS_CIVIL)])
  @IsOptional()
  statusCivil?: T extends { blood: infer U } ? U : never;
}

export class FilterRelationsDto<T> extends FilterEnumsDto<T> {
  @ApiProperty({ type: Boolean, required: false })
  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  @ToBoolean('staff')
  staff?: boolean = false;

  @ApiProperty({ type: Boolean, required: false })
  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  @ToBoolean('position')
  position?: boolean = false;

  @ApiProperty({ type: Boolean, required: false })
  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  @ToBoolean('contract')
  contract?: boolean = false;

  @ApiProperty({ type: Boolean, required: false })
  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  @ToBoolean('account')
  account?: boolean = false;

  @ApiProperty({ type: Boolean, required: false })
  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  @ToBoolean('bank')
  bank?: boolean = false;

  @ApiProperty({ type: Boolean, required: false })
  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  @ToBoolean('documents')
  documents?: boolean = false;

  @ApiProperty({ type: Boolean, required: false })
  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  @ToBoolean('dismissal')
  dismissal?: boolean = false;

  // @IsNumber()
  // @IsPositive()
  // @IsOptional()
  // bond?: number = 0;

  @ApiProperty({ type: Boolean, required: false })
  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  @ToBoolean('bonds')
  bonds?: boolean = false;

  @ApiProperty({ type: Boolean, required: false })
  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  @ToBoolean('presence')
  presence?: boolean = false;

  @ApiProperty({ type: Boolean, required: false })
  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  @ToBoolean('vacation')
  vacation?: boolean = false;
}
