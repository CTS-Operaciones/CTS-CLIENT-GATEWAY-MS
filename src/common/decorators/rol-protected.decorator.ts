import { SetMetadata } from '@nestjs/common';

export const META_ROLES = 'roles';

export const RolProtected = (...roles: string[]) =>
  SetMetadata(META_ROLES, roles);
