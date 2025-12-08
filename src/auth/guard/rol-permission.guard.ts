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
  DEPENDENCIES_ENABLED_KEY,
  ADDITIONAL_DEPENDENCIES_KEY,
} from '../../common';
import { ModuleDependenciesService } from '../services/module-dependencies.service';

@Injectable()
export class RoleAndPermissionGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private dependenciesService: ModuleDependenciesService,
  ) {}

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

    // Validar módulo principal
    const hasMainPermission = this.hasPermission(
      userRole,
      permissions,
      moduleEnumRequired,
      permissionEnumRequired,
    );

    // Verificar si las dependencias están habilitadas (por defecto: true)
    const dependenciesEnabled =
      this.reflector.getAllAndOverride<boolean>(DEPENDENCIES_ENABLED_KEY, [
        context.getHandler(),
        context.getClass(),
      ]) ?? true;

    // Si tiene el permiso principal, validar también las dependencias requeridas
    if (hasMainPermission && dependenciesEnabled) {
      const dependencies = this.dependenciesService.getDependencies(
        moduleEnumRequired,
        permissionEnumRequired,
      );

      // Obtener dependencias adicionales del endpoint si existen
      const additionalDeps =
        this.reflector.getAllAndOverride<
          Array<{
            module: keyof typeof MODULES_ENUM;
            permission: keyof typeof PERMISSIONS_ENUM;
          }>
        >(ADDITIONAL_DEPENDENCIES_KEY, [
          context.getHandler(),
          context.getClass(),
        ]) || [];

      const allDependencies = [...dependencies, ...additionalDeps];

      // Validar que tenga TODAS las dependencias requeridas
      if (allDependencies.length > 0) {
        const missingDependencies: string[] = [];

        for (const dep of allDependencies) {
          if (
            !this.hasPermission(
              userRole,
              permissions,
              dep.module,
              dep.permission,
            )
          ) {
            missingDependencies.push(
              `${MODULES_ENUM[dep.module]} - ${PERMISSIONS_ENUM[dep.permission]}`,
            );
          }
        }

        if (missingDependencies.length > 0) {
          throw new ForbiddenException(
            `Acceso denegado. Faltan los siguientes permisos requeridos: ${missingDependencies.join(', ')}`,
          );
        }
      }

      // Si tiene el permiso principal y todas las dependencias, permitir acceso
      return true;
    }

    // Si no tiene el permiso principal, denegar acceso
    if (!hasMainPermission) {
      throw new ForbiddenException(
        `Acceso denegado. No tienes el permiso necesario: ${MODULES_ENUM[moduleEnumRequired]} - ${PERMISSIONS_ENUM[permissionEnumRequired]}`,
      );
    }

    // Si tiene el permiso principal pero las dependencias están deshabilitadas
    return true;
  }

  /**
   * Valida si el usuario tiene un permiso específico según su rol
   */
  private hasPermission(
    userRole: keyof typeof ROLE,
    permissions: IResponseEnumPermissions[],
    moduleEnumRequired: keyof typeof MODULES_ENUM,
    permissionEnumRequired: keyof typeof PERMISSIONS_ENUM,
  ): boolean {
    if (userRole === ROLE.ADMIN) {
      // ADMIN: solo validar módulo
      return permissions.some((el) =>
        el.module.includes(MODULES_ENUM[moduleEnumRequired]),
      );
    }

    // USER: validar módulo y permiso específico
    return permissions.some(
      (el) =>
        el.module.includes(MODULES_ENUM[moduleEnumRequired]) &&
        el.permission.includes(PERMISSIONS_ENUM[permissionEnumRequired]),
    );
  }
}
