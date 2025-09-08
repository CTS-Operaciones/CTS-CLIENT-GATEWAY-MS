import { Module } from '@nestjs/common';

import { BondsController } from './bonds.controller';
import { NatsModule } from '../../transports/nats.module';

@Module({
  imports: [NatsModule],
  controllers: [BondsController],
})
export class BondsModule {}
