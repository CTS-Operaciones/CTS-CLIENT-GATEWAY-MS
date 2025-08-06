import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { CreateHasAddRemoveDto } from './create-inventory-has-add-remove.dto';
import {
  ArrayNotEmpty,
  IsNotEmpty,
  IsNumber,
  IsPositive,
} from 'class-validator';

export class UpdateHasAddRemoveDto {
  @ApiProperty({ type: Number, description: 'Id del acta' })
  @IsPositive()
  @IsNotEmpty()
  @IsNumber()
  idActa: number;
  @ApiProperty({ type: [Number], description: 'Id del inventario []' })
  @IsNumber({}, { each: true })
  @ArrayNotEmpty()
  itemId: number[];
}
