
import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsPositive,

} from 'class-validator';



export class CreateHasAdmisaionHasDischargeDto {
  //Id del acta
  @ApiProperty({ type: Number, description: 'Id of the admission' })
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  idActa: number;
  // Inventory
  @ApiProperty({ type: [Number], description: 'Recurso' })
  @IsArray()
  idInventory: number[];
}
