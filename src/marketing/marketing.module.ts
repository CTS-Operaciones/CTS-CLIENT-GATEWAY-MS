import { Module } from '@nestjs/common';

import { MarketingController } from './marketing.controller';
import { NatsModule } from '../transports/nats.module';

@Module({
  imports: [NatsModule],
  controllers: [MarketingController],
})
export class MarketingModule {}
