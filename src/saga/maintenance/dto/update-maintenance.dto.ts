import {  PartialType } from '@nestjs/swagger';
import { CreateMantenanceDto } from './create-maintenance.dto';

export class UpdateMantenanceDto extends PartialType(CreateMantenanceDto) {
  
}
