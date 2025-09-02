import { Module } from '@nestjs/common';

import { NatsModule } from '../../transports/nats.module';
import { PresenceController } from './presence.controller';

@Module({
  imports: [NatsModule],
  controllers: [PresenceController],
})
export class PresenceModule {}
