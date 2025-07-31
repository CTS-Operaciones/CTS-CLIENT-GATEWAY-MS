import { Module } from '@nestjs/common';

import { NatsModule } from '../../transports/nats.module';
import {
  RhAsignedPositionsController,
  RhEmployeeController,
} from './rh-employee.controller';

@Module({
  imports: [NatsModule],
  controllers: [RhEmployeeController, RhAsignedPositionsController],
})
export class RhEmployeeModule {}
