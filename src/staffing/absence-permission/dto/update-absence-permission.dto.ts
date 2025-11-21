import { PartialType } from '@nestjs/swagger';

import { CreateAbsencePermissionDto } from './create-absence-permission.dto';

export class UpdateAbsencePermissionDto extends PartialType(
  CreateAbsencePermissionDto,
) {}
