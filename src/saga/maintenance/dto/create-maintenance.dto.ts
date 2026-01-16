import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { MAITENANCE_TYPE, STATUS_MANTENANCE } from '../../../common/constants/sagaEnums';
import { parseLocalDate } from 'src/common';

export class CreateMantenanceDto {
  @ApiProperty({ type: Date, required: true })
  @IsDate()
  @IsNotEmpty()
  date_init: Date;

  @ApiProperty({ type: Date, required: false })
  @IsDate()
  @IsNotEmpty()
  date_end: Date;

  @ApiProperty({ type: String, required: false })
  @IsString()
  observations: string;

  @ApiProperty({ type: Number, required: true })
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  responsible: number;

  @ApiProperty({ type: String, required: false })
  @IsString()
  description: string;

  @ApiProperty({ type: Number, required: true })
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  projectId: number;

  @ApiProperty({
    enum: STATUS_MANTENANCE,
    description: 'STATUS OF THE MAINTENANCE',
  })
  @IsEnum(STATUS_MANTENANCE)
  status: STATUS_MANTENANCE = STATUS_MANTENANCE.EN_OPERACION;

  @ApiProperty({
    enum: MAITENANCE_TYPE,
    description: 'TYPE OF MAINTENANCE ',
  })
  @IsEnum(MAITENANCE_TYPE)
  maintenanceType: MAITENANCE_TYPE = MAITENANCE_TYPE.PREVENTIVO;
}
