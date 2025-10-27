import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard, RoleAndPermissionGuard } from '../../auth/guard';

import { MODULES_ENUM, PERMISSIONS_ENUM, ROLE } from '../constants/auth.enum';
import { Permissions } from './permissions.decorator';

export const Auth = (
  module?: keyof typeof MODULES_ENUM,
  permission?: keyof typeof PERMISSIONS_ENUM,
) => {
  const decorators = [UseGuards(AuthGuard, RoleAndPermissionGuard)];

  if (module && permission) {
    decorators.push(Permissions(module, permission));
  }

  return applyDecorators(...decorators);
};;
