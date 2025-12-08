import { Injectable } from '@nestjs/common';
import { MODULES_ENUM, PERMISSIONS_ENUM } from '../../common/constants/auth.enum';
import { MODULE_DEPENDENCIES } from '../../common/configs/module-dependencies.config';

@Injectable()
export class ModuleDependenciesService {
  /**
   * Obtiene las dependencias configuradas para un módulo y permiso específico
   * @param module - Módulo a consultar
   * @param permission - Permiso a consultar
   * @returns Array de módulos y permisos dependientes
   */
  getDependencies(
    module: keyof typeof MODULES_ENUM,
    permission: keyof typeof PERMISSIONS_ENUM,
  ): Array<{ module: keyof typeof MODULES_ENUM; permission: keyof typeof PERMISSIONS_ENUM }> {
    const dependency = MODULE_DEPENDENCIES.find(
      (dep) => dep.module === module && dep.permission === permission,
    );

    return dependency?.dependsOn || [];
  }

  /**
   * Verifica si un módulo y permiso tienen dependencias configuradas
   * @param module - Módulo a verificar
   * @param permission - Permiso a verificar
   * @returns true si tiene dependencias, false en caso contrario
   */
  hasDependencies(
    module: keyof typeof MODULES_ENUM,
    permission: keyof typeof PERMISSIONS_ENUM,
  ): boolean {
    return (
      MODULE_DEPENDENCIES.some(
        (dep) => dep.module === module && dep.permission === permission,
      ) && this.getDependencies(module, permission).length > 0
    );
  }
}

