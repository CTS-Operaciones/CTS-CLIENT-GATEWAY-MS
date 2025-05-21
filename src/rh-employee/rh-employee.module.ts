import { Module } from '@nestjs/common';
import { RhEmployeeController } from './rh-employee.controller';
import { NatsModule } from '../transports/nats.module';

@Module({
  imports: [NatsModule],
  controllers: [RhEmployeeController],
  providers: [],
})
export class RhEmployeeModule {}
