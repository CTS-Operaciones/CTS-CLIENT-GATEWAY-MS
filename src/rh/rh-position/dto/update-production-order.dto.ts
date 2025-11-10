import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsArray,
  IsNumber,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class ProductionOrderItemDto {
  @ApiProperty({
    type: Number,
    description: 'Position id',
  })
  @IsNumber()
  @Min(1)
  positionId: number;

  @ApiProperty({
    type: Number,
    description: 'Process order',
  })
  @IsNumber()
  @Min(1)
  processOrder: number;
}

export class UpdateProductionOrderDto {
  @ApiProperty({
    type: [ProductionOrderItemDto],
    description: 'Positions to update',
  })
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => ProductionOrderItemDto)
  positions: ProductionOrderItemDto[];
}

