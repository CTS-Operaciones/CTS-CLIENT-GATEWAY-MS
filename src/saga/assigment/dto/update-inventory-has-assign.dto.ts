import { PartialType } from '@nestjs/swagger';
import { CreateHasAssignDto } from './create-inventory-has-assign.dto';

export class UpdateHasAssignDto extends PartialType(CreateHasAssignDto) {}
