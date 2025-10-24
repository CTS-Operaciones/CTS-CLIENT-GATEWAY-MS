import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

import { IAddModuleToProfile, PERMISSIONS_KEY } from '../../common';

@Injectable()
export class RoleAndPermissionGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    //Obtener los permisos requeridos del decorador @Permissions()
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );

    //Si no hay decorador @Permissions, no se requiere un permiso específico. Permitir acceso.
    if (!requiredPermissions) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    //Asumimos que AuthGuard ya se ejecutó y adjuntó 'user' a la request
    const user = request['user'];
    const role = request['rol'];
    const permissions: IAddModuleToProfile[] =
      request['permission']?.permissions;

    //Verificar que el objeto 'user' y sus permisos existan
    if (!role || permissions.length === 0) {
      throw new ForbiddenException(
        'Acceso denegado. Permisos de usuario no encontrados.',
      );
    }

    if (role === 'Administrador') {
      return true;
    }

    //Lógica de verificación: el usuario debe tener AL MENOS uno de los permisos requeridos
    const [module, perm] = requiredPermissions;

    const hasPermission = permissions.some(
      (el: IAddModuleToProfile) =>
        el.module == parseInt(module) && el.permission.includes(parseInt(perm)),
    );

    if (!hasPermission) {
      throw new ForbiddenException(
        'Acceso denegado. No tienes los permisos necesarios para esta acción.',
      );
    }

    return true;
  }
}
