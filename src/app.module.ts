import { Module } from '@nestjs/common';

import { NatsModule } from './transports/nats.module';
import { RhDeparmentModule } from './rh/rh-deparment/rh-deparment.module';
import { RhPositionModule } from './rh/rh-position/rh-position.module';
import { RhEmployeeModule } from './rh/rh-employee/rh-employee.module';
import { AuthModule } from './auth/auth/auth.module';
import { RoleModule } from './auth/role/role.module';
import { RhBondModule } from './rh/rh-bond/rh-bond.module';
import { RhDocumentModule } from './rh/rh-document/rh-document.module';
import { ExtensionsModule } from './op/extensions/extensions.module';
import { ProjectsModule } from './op/projects/projects.module';
import { ResourceModule } from './saga/resources/resource.module';
import { HeadquartersModule } from './op/headquarters/headquarters.module';
import { RhBanksModule } from './rh/rh-bank/rh-bank.module';
import { StaffModule } from './staffing/staff/staff.module';
import { ModuleModule } from './auth/module/module.module';
import { PermissionModule } from './auth/permission/permission.module';
import { BondsModule } from './staffing/bonds/bonds.module';
import { ContractModule } from './rh';
import { ProfileModule } from './auth/profile/profile.module';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [
    RhBanksModule,
    RhDeparmentModule,
    ContractModule,
    NatsModule,
    RhPositionModule,
    RhEmployeeModule,
    AuthModule,
    ProfileModule,
    RoleModule,
    ModuleModule,
    PermissionModule,
    RhBondModule,
    RhDocumentModule,
    ExtensionsModule,
    ProjectsModule,
    ResourceModule,
    HeadquartersModule,
    StaffModule,
    BondsModule,
    NotificationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
