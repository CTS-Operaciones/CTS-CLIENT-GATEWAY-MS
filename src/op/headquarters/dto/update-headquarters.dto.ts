import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import {
  AddQuotaEmployeePosition,
  CreateHeadquartersDto,
} from './create-headquarters.dto';

export class UpdateHeadquartersDto extends PartialType(
  OmitType(CreateHeadquartersDto, ['project'] as const),
) {}

export class UpdateAddQuotaEmployeePosition {
  @ApiProperty({
    type: [AddQuotaEmployeePosition],
    description: 'Array of employee positions to add to the quota',
    required: true,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AddQuotaEmployeePosition)
  quota: AddQuotaEmployeePosition[];
}
