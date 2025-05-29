import { Module } from '@nestjs/common';

import { NatsModule } from './transports/nats.module';
import { RhDeparmentModule } from './rh/rh-deparment/rh-deparment.module';
import { RhPositionModule } from './rh/rh-position/rh-position.module';
import { RhEmployeeModule } from './rh/rh-employee/rh-employee.module';
import { AuthModule } from './auth/auth/auth.module';
import { RoleModule } from './auth/role/role.module';

@Module({
  imports: [
    RhDeparmentModule,
    NatsModule,
    RhPositionModule,
    RhEmployeeModule,
    AuthModule,
    RoleModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
