import { IsEnum, IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";
import { ADD_REMOVE } from 'src/common';
import { ApiProperty } from '@nestjs/swagger';
export class CreateAddRemoveDto {
  @ApiProperty({
    type: String,
    description: 'Motive of the resource add/remove',
  })
  @IsString()
  @IsNotEmpty()
  motive: string;

  @ApiProperty({
    type: String,
    description: 'Observations of the resource add/remove',
  })
  @IsString()
  @IsNotEmpty()
  observations: string;

  @ApiProperty({
    enum: ADD_REMOVE,
  })
  @IsEnum(ADD_REMOVE)
  type: ADD_REMOVE;

  @ApiProperty({
    type: String,
    description: 'Numero de la factura',
  })
  @IsString()
  factura: string;
}
