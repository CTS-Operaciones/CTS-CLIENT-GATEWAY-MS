import { Module } from '@nestjs/common';

import { NatsModule } from './transports/nats.module';
import { RhDeparmentModule } from './rh/rh-deparment/rh-deparment.module';
import { RhPositionModule } from './rh/rh-position/rh-position.module';

@Module({
  imports: [RhDeparmentModule, NatsModule, RhPositionModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
