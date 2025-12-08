import { Module } from '@nestjs/common';

import { NatsModule } from './transports/nats.module';
import { GuardModule } from './auth/guard/guard.module';
import { AuthModule } from './auth/auth/auth.module';
import { RoleModule } from './auth/role/role.module';
import { ExtensionsModule } from './op/extensions/extensions.module';
import { ProjectsModule } from './op/projects/projects.module';
import { HeadquartersModule } from './op/headquarters/headquarters.module';
import { StaffModule } from './staffing/staff/staff.module';
import { ModuleModule } from './auth/module/module.module';
import { PermissionModule } from './auth/permission/permission.module';
import { BondsModule } from './rh/bonds/bonds.module';
import {
  ContractModule,
  HolidayModule,
  RhBanksModule,
  RhDeparmentModule,
  RhDocumentModule,
  RhEmployeeModule,
  RhPositionModule,
} from './rh';
import { ProfileModule } from './auth/profile/profile.module';
import { NotificationModule } from './notification/notification.module';
import { MarketingModule } from './marketing/marketing.module';
import { ResourceModule } from './saga/resources/resource.module';
import { InventoryModule } from './saga/inventory/inventory.module';
import { AddRemoveModule } from './saga/add-remove/add-remove.module';
import { AssigmentModule } from './saga/assigment/assigment.module';
import { DismissalModule } from './rh/dismissal/dismissal.module';
import { PresenceModule } from './staffing/presence/presence.module';
import { AdmissionDischargeModule } from './saga/admission-discharge/admission-discharge.module';
import { RhVacationModule } from './staffing/vacation/vacation.module';
import { AbsencePermissionModule } from './staffing/absence-permission/absence-permission.module';
import { HabilitationModule } from './saga/habilitation/habilitation.module';
import { GenerateDocModule } from './generate-doc/generate-doc.module';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [
    GuardModule,
    RhBanksModule,
    ContractModule,
    RhDeparmentModule,
    RhDocumentModule,
    RhEmployeeModule,
    HolidayModule,
    RhPositionModule,
    NatsModule,
    AuthModule,
    ProfileModule,
    RoleModule,
    ModuleModule,
    MarketingModule,
    PermissionModule,
    ExtensionsModule,
    ProjectsModule,
    ResourceModule,
    HeadquartersModule,
    StaffModule,
    BondsModule,
    NotificationModule,
    InventoryModule,
    AddRemoveModule,
    AssigmentModule,
    DismissalModule,
    PresenceModule,
    AdmissionDischargeModule,
    RhVacationModule,
    AbsencePermissionModule,
    HabilitationModule,
    GenerateDocModule,
    DashboardModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
