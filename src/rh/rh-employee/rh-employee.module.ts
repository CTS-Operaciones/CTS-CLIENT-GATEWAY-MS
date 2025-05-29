import { Module } from '@nestjs/common';

import { NatsModule } from '../../transports/nats.module';
import { RhEmployeeController } from './rh-employee.controller';

@Module({
  imports: [NatsModule],
  controllers: [RhEmployeeController],
})
export class RhEmployeeModule {}
