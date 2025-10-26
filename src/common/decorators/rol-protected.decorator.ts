import { SetMetadata } from '@nestjs/common';
import { ROLE } from '../constants/auth.enum';

export const META_ROLES = 'roles';

export const RolProtected = (roles: keyof typeof ROLE) =>
  SetMetadata(META_ROLES, roles);
