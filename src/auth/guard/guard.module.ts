import { Global, Module } from '@nestjs/common';

import { AuthGuard } from './auth.guard';
import { RoleAndPermissionGuard } from './rol-permission.guard';
import { ModuleDependenciesService } from '../services/module-dependencies.service';
import { NatsModule } from '../../transports/nats.module';

@Global()
@Module({
  imports: [NatsModule],
  providers: [AuthGuard, RoleAndPermissionGuard, ModuleDependenciesService],
  exports: [AuthGuard, RoleAndPermissionGuard, ModuleDependenciesService],
})
export class GuardModule {}

