import { Module } from '@nestjs/common';

import { StaffController } from './staff.controller';
import { NatsModule } from '../transports/nats.module';

@Module({
  imports: [NatsModule],
  controllers: [StaffController],
})
export class StaffModule {}
