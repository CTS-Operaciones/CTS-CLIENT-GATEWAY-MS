import { PartialType } from '@nestjs/swagger';
import { CreateAddRemoveDto } from './create-add-remove.dto';

export class UpdateAddRemoveDto extends PartialType(CreateAddRemoveDto) {}
