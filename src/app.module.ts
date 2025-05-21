import { Module } from '@nestjs/common';
import { RhEmployeeModule } from './rh-employee/rh-employee.module';
import { NatsModule } from './transports/nats.module';

@Module({
  imports: [RhEmployeeModule, NatsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
