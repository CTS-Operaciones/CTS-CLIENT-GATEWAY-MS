import { Module } from '@nestjs/common';

import { NatsModule } from '../../transports/nats.module';
import { RhBondController } from './rh-bond.controller';

@Module({
  imports: [NatsModule],
  controllers: [RhBondController],
})
export class RhBondModule {}
