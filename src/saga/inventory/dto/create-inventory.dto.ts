import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { STATUS_ENTRIES } from 'src/common';
export class CreateInventoryDto {
  @ApiProperty({ type: String, description: 'Name of the inventory' })
  @IsString()
  idName?: string;

  @ApiProperty({ type: String, description: 'Serial number of the inventory' })
  @IsString()
  serialNumber?: string;

  @ApiProperty({ type: Number, description: 'User id of the inventory' })
  @IsNumber()
  user_id?: number;

  @ApiProperty({ type: Number, description: 'Sede id of the inventory' })
  @IsNumber()
  sede_id: number;

  @ApiProperty({ type: Number, description: 'State id of the inventory' })
  @IsNumber()
  state?: number;

  @ApiProperty({ type: Number, description: 'Resource id of the inventory' })
  @IsNumber()
  resource: number;

  @ApiProperty({
    enum: STATUS_ENTRIES,
  })
  @IsEnum(STATUS_ENTRIES)
  @IsNotEmpty()
  status?: STATUS_ENTRIES;

  @ApiProperty({ type: Number, description: 'Ubication id of the inventory' })
  @IsNumber()
  ubications?: number;
}
