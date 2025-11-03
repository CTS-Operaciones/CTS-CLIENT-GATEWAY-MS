import { IsNotEmpty, IsString } from 'class-validator';

import { IPermissionForm } from '../../common';
import { ApiProperty } from '@nestjs/swagger';

export class PermissionFormDto implements IPermissionForm {
  @ApiProperty({ type: String, description: 'Headquartere of the document' })
  @IsString()
  @IsNotEmpty()
  headquartere: string;

  @ApiProperty({ type: String, description: 'Date of the document' })
  @IsString()
  @IsNotEmpty()
  date: string;

  @ApiProperty({ type: String, description: 'Employee name of the document' })
  @IsString()
  @IsNotEmpty()
  employeeName: string;

  @ApiProperty({ type: String, description: 'Employee number of the document' })
  @IsString()
  @IsNotEmpty()
  employeeNumber: string;

  @ApiProperty({ type: String, description: 'Position of the document' })
  @IsString()
  @IsNotEmpty()
  position: string;

  @ApiProperty({ type: String, description: 'Boss name of the document' })
  @IsString()
  @IsNotEmpty()
  bossName: string;

  @ApiProperty({ type: String, description: 'Boss position of the document' })
  @IsString()
  @IsNotEmpty()
  bossPosition: string;

  @ApiProperty({ type: String, description: 'Directive name of the document' })
  @IsString()
  @IsNotEmpty()
  directiveName: string;

  @ApiProperty({
    type: String,
    description: 'Directive RH name of the document',
  })
  @IsString()
  @IsNotEmpty()
  directiveRhName: string;
}
