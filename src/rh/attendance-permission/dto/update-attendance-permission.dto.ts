import { PartialType } from '@nestjs/swagger';

import { CreateAttendancePermissionDto } from './create-attendance-permission.dto';

export class UpdateAttendancePermissionDto extends PartialType(
  CreateAttendancePermissionDto,
) {}
