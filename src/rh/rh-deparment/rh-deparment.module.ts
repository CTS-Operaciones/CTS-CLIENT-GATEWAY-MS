import { Module } from '@nestjs/common';
import { RhDepartmentController } from './rh-deparment.controller';
import { NatsModule } from '../../transports/nats.module';

@Module({
  imports: [NatsModule],
  controllers: [RhDepartmentController],
})
export class RhDeparmentModule {}
