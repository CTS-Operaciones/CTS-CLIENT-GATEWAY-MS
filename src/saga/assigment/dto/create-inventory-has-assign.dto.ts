
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPositive,
} from 'class-validator';

import { Type } from 'class-transformer';
import { ASSIGNMENT_STATUS, ToBoolean } from 'src/common';
import { ApiProperty } from '@nestjs/swagger';

export class CreateHasAssignDto {
  //Id del acta
  @ApiProperty({ type: Number, description: 'Id del acta' })
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  idActa: number;

  @ApiProperty({ type: [Number], description: 'Resource' })
  @IsArray()
  idInventory: number[];

  @ApiProperty({ enum: ASSIGNMENT_STATUS, description: 'Assigment Status' })
  @IsEnum(ASSIGNMENT_STATUS)
  @IsNotEmpty()
  type: ASSIGNMENT_STATUS = ASSIGNMENT_STATUS.ASIGNACION;

  @ApiProperty({ type: Boolean, description: 'Is Boolea?' })
  @IsBoolean()
  @IsNotEmpty()
  @Type(() => Boolean)
  @ToBoolean('is_preassignment')
  is_preassignment: boolean = false;
}
