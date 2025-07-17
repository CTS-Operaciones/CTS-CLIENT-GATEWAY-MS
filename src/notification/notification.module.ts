import { Module } from '@nestjs/common';

import { NatsModule } from '../transports/nats.module';

import { NotificationController } from './notification.controller';

@Module({
  imports: [NatsModule],
  controllers: [NotificationController],
})
export class NotificationModule {}
