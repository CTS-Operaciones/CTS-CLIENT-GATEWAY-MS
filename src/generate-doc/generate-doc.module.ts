import { Module } from '@nestjs/common';

import { NatsModule } from '../transports/nats.module';
import { GenerateDocController } from './generate-doc.controller';

@Module({
  imports: [NatsModule],
  controllers: [GenerateDocController],
})
export class GenerateDocModule {}
