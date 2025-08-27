
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateResourceDto as createResourceDto } from '../../resources/dto/create-resource.dto';
import { Type } from 'class-transformer';
import { STATUS_RESOURCE } from 'src/common';
import { ApiProperty } from '@nestjs/swagger';

export class CreateHasAssignDto {
  //Id del acta
  @ApiProperty({ type: Number, description: 'Id del acta' })
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  idActa: number;

  @ApiProperty({ type: [Number], description: 'Recurso' })
  @IsArray()
  idInventory: number[];
}
