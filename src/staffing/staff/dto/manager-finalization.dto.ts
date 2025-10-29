import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPositive,
} from 'class-validator';

export enum StaffFinalizationAction {
  MOVER = 'MOVER',
  FINIQUITAR = 'FINIQUITAR',
}

export class ManageStaffFinalizationDto {
  @ApiProperty({type: Array<Number>, description: "Id's Staff"})
  @IsArray()
  @IsNotEmpty()
  @IsNumber({}, { each: true })
  @IsPositive({ each: true })
  staffIds: number[];

  @ApiProperty({enum: StaffFinalizationAction })
  @IsEnum(StaffFinalizationAction)
  @IsNotEmpty()
  action: StaffFinalizationAction;
}

