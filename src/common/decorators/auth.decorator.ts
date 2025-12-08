import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { AuthGuard, RoleAndPermissionGuard } from '../../auth/guard';

import { MODULES_ENUM, PERMISSIONS_ENUM, ROLE } from '../constants/auth.enum';
import {
  Permissions,
  DEPENDENCIES_ENABLED_KEY,
  ADDITIONAL_DEPENDENCIES_KEY,
} from './permissions.decorator';

export interface AuthOptions {
  useDependencies?: boolean; // true por defecto
  additionalDependencies?: Array<{
    module: keyof typeof MODULES_ENUM;
    permission: keyof typeof PERMISSIONS_ENUM;
  }>;
}

export const Auth = (
  module?: keyof typeof MODULES_ENUM,
  permission?: keyof typeof PERMISSIONS_ENUM,
  options?: AuthOptions,
) => {
  const decorators = [UseGuards(AuthGuard, RoleAndPermissionGuard)];

  if (module && permission) {
    decorators.push(Permissions(module, permission));

    // Agregar metadata para dependencias si están habilitadas
    if (options?.useDependencies !== false) {
      decorators.push(SetMetadata(DEPENDENCIES_ENABLED_KEY, true));
    }

    if (
      options?.additionalDependencies &&
      options.additionalDependencies.length > 0
    ) {
      decorators.push(
        SetMetadata(
          ADDITIONAL_DEPENDENCIES_KEY,
          options.additionalDependencies,
        ),
      );
    }
  }

  return applyDecorators(...decorators);
};
