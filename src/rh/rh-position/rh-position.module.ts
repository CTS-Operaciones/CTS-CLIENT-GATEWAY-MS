import { Module } from '@nestjs/common';

import { NatsModule } from '../../transports/nats.module';
import { RhPositionController } from './rh-position.controller';

@Module({
  imports: [NatsModule],
  controllers: [RhPositionController],
})
export class RhPositionModule {}
