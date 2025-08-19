import { Type } from 'class-transformer';
import { IsBoolean, IsOptional } from 'class-validator';
import { ToBoolean } from '../../../common';
import { ApiProperty } from '@nestjs/swagger';

export class FindStaffDto {
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
