import { Module } from '@nestjs/common';

import { NatsModule } from '../../transports/nats.module';
import { RhVacationController } from './rh-vacation.controller';

@Module({
  imports: [NatsModule],
  controllers: [RhVacationController],
})
export class RhVacationModule {}
