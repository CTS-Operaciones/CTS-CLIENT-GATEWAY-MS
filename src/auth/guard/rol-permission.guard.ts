import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

import {
  IResponseEnumPermissions,
  PERMISSIONS_KEY,
  MODULES_ENUM,
  PERMISSIONS_ENUM,
  ROLE,
} from '../../common';

@Injectable()
export class RoleAndPermissionGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const userRole: keyof typeof ROLE = request['rol'];
    const permissions: IResponseEnumPermissions[] =
      request['permission']?.permissions;

    if (!userRole) {
      throw new ForbiddenException(
        'Acceso denegado. Rol de usuario no encontrado.',
      );
    }

    if (userRole === ROLE.SUPER_ADMIN) return true;

    const requiredPermissions = this.reflector.getAllAndOverride<
      readonly [keyof typeof MODULES_ENUM, keyof typeof PERMISSIONS_ENUM]
    >(PERMISSIONS_KEY, [context.getHandler(), context.getClass()]);

    // Si no hay decorador, permitir acceso
    if (!requiredPermissions) return true;

    const [moduleEnumRequired, permissionEnumRequired] = requiredPermissions;

    if (!permissions?.length) {
      throw new ForbiddenException(
        'Acceso denegado. Permisos de usuario no encontrados.',
      );
    }

    // Otros roles: validar módulo + permiso
    const hasPermission = permissions.some(
      (el) =>
        el.module.includes(MODULES_ENUM[moduleEnumRequired]) &&
        el.permission.includes(PERMISSIONS_ENUM[permissionEnumRequired]),
    );

    if (!hasPermission) {
      throw new ForbiddenException(
        'Acceso denegado. No tienes los permisos necesarios para esta acción.',
      );
    }

    return true;
  }
}
