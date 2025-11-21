import { Module } from '@nestjs/common';

import { NatsModule } from '../../transports/nats.module';
import { AbsencePermissionController } from './absence-permission.controller';

@Module({
  imports: [NatsModule],
  controllers: [AbsencePermissionController],
})
export class AbsencePermissionModule {}
