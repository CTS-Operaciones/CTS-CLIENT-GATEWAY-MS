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

  /*   @ApiProperty({ type: [Number], description: 'Inventory id of the resource add/remove' })
  @IsNumber()
  idIventory: number[];
 */
  @ApiProperty({
    type: String,
    description: 'Type of the resource add/remove: ALTA/BAJA',
  })
  @IsEnum(ADD_REMOVE)
  type: ADD_REMOVE;

  @ApiProperty({
    type: Number,
    description: 'Ubication id of the resource add/remove',
  })
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  ubicationId: number;
}
