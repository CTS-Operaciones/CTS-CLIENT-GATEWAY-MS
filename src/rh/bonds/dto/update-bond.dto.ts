import { PartialType } from '@nestjs/swagger';
import {
  CreateBondDto,
  CreateTypeBondDto,
  CreateDescriptionBondDto,
} from './create-bond.dto';

export class UpdateBondDto extends PartialType(CreateBondDto) {}

export class UpdateTypeBondDto extends PartialType(CreateTypeBondDto) {}

export class UpdateDescriptionBondDto extends PartialType(
  CreateDescriptionBondDto,
) {}
