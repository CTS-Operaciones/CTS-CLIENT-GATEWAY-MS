import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsPositive } from 'class-validator';
import { ICreateStaff } from '../../../common';

export class CreateStaffDto implements ICreateStaff {
  @ApiProperty({ type: Number, description: 'Id EmployeeHasPositions' })
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  employeeHasPositions: number;

  @ApiProperty({ type: Number, description: 'Id Headquarter of project' })
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  headquarter: number;

  @ApiProperty({
    type: Number,
    description: 'Id of boos of staff (this is id of staff in project)',
    required: false,
  })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  parent?: number = undefined;
}
