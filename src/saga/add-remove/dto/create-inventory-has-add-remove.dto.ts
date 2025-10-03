import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  ValidateNested,
} from 'class-validator';

import { CreateInventoryDto } from 'src/saga/inventory/dto/create-inventory.dto';

export class ResourceDto {
  @ApiProperty({ type: Number, description: 'Id del recurso' })
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  idResource: number;

  @ApiProperty({
    type: Number,
    description: 'Cantidad de elelementos del recurso',
  })
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  quantity: number;
}

export class CreateHasAddRemoveDto {
  @ApiProperty({ type: Number, description: 'Id del acta de inventario' })
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  idActa: number;

  @ApiProperty({ type: CreateInventoryDto, description: 'Recurso' })
  @ValidateNested()
  @Type(() => CreateInventoryDto)
  inventory: CreateInventoryDto;
}

export class CreateRemoveDto {
  @IsNumber()
  idActa: number;

  @IsString()
  factura: number;

  @IsArray()
  idInventory: number[];
}
