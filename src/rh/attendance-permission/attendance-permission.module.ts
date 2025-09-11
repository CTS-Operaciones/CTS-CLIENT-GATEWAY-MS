import { Module } from '@nestjs/common';

import { NatsModule } from '../../transports/nats.module';
import { AttendancePermissionController } from './attendance-permission.controller';

@Module({
  imports: [NatsModule],
  controllers: [AttendancePermissionController],
})
export class AttendancePermissionModule {}
