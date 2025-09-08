import { Module } from '@nestjs/common';
import { DismissalController } from './dismissal.controller';
import { NatsModule } from '../../transports/nats.module';

@Module({
  imports: [NatsModule],
  controllers: [DismissalController],
})
export class DismissalModule {}
