import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  ValidateNested,
} from 'class-validator';

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

  @ApiProperty({ type: [ResourceDto], description: 'Recurso' })
  @IsArray()
  @ValidateNested()
  @Type(() => ResourceDto)
  resource: ResourceDto[];
}
