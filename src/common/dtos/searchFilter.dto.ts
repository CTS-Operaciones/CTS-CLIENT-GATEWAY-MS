import { IsEnum, IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';
import { STATUS_ENTRIES, STATUS_INVENTORY } from '../constants';
import { filter } from '../interfaces/searchFilter.interface';
import { ApiProperty } from '@nestjs/swagger';
import { PaginationDto } from './pagination.dto';
import { Type } from 'class-transformer';

export class filterDto implements filter {
  @ApiProperty({
    type: Number,
    description: 'Model id of the inventory',
    required: false,
  })
  @IsNumber()
  model: number;

  @ApiProperty({
    type: Number,
    description: 'Brand id of the inventory',
    required: false,
  })
  @IsNumber()
  brand: number;

  @ApiProperty({
    type: Number,
    description: 'Ubication id of the inventory',
    required: false,
  })
  @IsNumber()
  ubication: number;

  @ApiProperty({
    type: String,
    description: 'Name of the inventory',
    required: false,
  })
  @IsNumber()
  name: string;

  @ApiProperty({
    type: Number,
    description: 'Clasification id of the inventory',
    required: false,
  })
  @IsNumber()
  clasification: number;

  @ApiProperty({
    type: Number,
    description: 'Resource id of the inventory',
    required: false,
  })
  @IsNumber()
  resource: number;

  @ApiProperty({
    type: Number,
    description: 'User id of the inventory',
    required: false,
  })
  @IsNumber()
  user_id: number;

  @ApiProperty({
    enum: STATUS_ENTRIES,
    required: false,
  })
  @IsEnum(STATUS_ENTRIES)
  @IsNotEmpty()
  status: STATUS_ENTRIES;
}

export class InventoryQueryDto {
  @ValidateNested()
  @Type(() => PaginationDto)
  pagination: PaginationDto;

  @ValidateNested()
  @Type(() => filterDto)
  filter: filterDto;
}