import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard, RoleAndPermissionGuard } from '../../auth/guard';
//import { AuthGuard } from '@nestjs/passport';

//import { RolProtected } from './rol-protected.decorator';
//import { UserRoleGuard } from 'src/auth/guard/user-rol.guard';

export const Auth = () => {
  return applyDecorators(
    // RolProtected,
    UseGuards(AuthGuard),
    UseGuards(RoleAndPermissionGuard),
  );
};
