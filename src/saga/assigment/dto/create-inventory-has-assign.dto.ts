
import {
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
// Resource
  @ApiProperty({ type: createResourceDto, description: 'Resource' })
  @ValidateNested()
  @Type(() => createResourceDto)
  resource: createResourceDto;
  //Id del acta
  @ApiProperty({ type: Number, description: 'Id del acta' })
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  idActa: number;
  // Inventory

  @ApiProperty({ type: String, description: 'Id (name) del inventario' })
  @IsString()
  idName: string;
  @ApiProperty({ type: String, description: 'Serial number del inventario' })
  @IsString()
  serialNumber: string;

  @ApiProperty({
    type: Number,
    description: 'Ubication id of the resource add/remove',
  })
  @IsNumber()
  ubications: number;

  @ApiProperty({ type: Number, description: 'User id of the inventory' })
  @IsNumber()
  user_id: number;
  @ApiProperty({
    type: Number,
    description: 'State id of the inventory [TRAYECTO/ALMACEN/DISPONIBLE]',
  })
  @IsEnum(STATUS_RESOURCE)
  @IsNotEmpty()
  status: STATUS_RESOURCE;
}
