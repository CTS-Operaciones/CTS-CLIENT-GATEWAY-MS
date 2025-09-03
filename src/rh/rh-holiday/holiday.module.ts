import { Module } from '@nestjs/common';

import { NatsModule } from '../../transports/nats.module';
import { HolidayController } from './holiday.controller';

@Module({
  imports: [NatsModule],
  controllers: [HolidayController],
})
export class HolidayModule {}
