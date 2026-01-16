import { PartialType} from '@nestjs/swagger';
import { CreateHasMaintenanceDto } from './create-inventory-has-maintenance.dto';

export class UpdateHasMaintenanceDto extends PartialType(
  CreateHasMaintenanceDto,
) {
}
