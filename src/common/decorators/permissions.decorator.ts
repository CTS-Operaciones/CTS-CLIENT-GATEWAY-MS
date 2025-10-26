import { SetMetadata } from '@nestjs/common';
import { MODULES_ENUM, PERMISSIONS_ENUM } from '../constants/auth.enum';

export const PERMISSIONS_KEY = 'permissions';

// Decorador tipado para usar enums directamente
export const Permissions = (
  module: keyof typeof MODULES_ENUM,
  permission: keyof typeof PERMISSIONS_ENUM,
) => SetMetadata(PERMISSIONS_KEY, [module, permission] as const);
