import { Module } from '@nestjs/common';

import { NatsModule } from '../../transports/nats.module';
import { ExtensionsController } from './extensions.controller';

@Module({
  imports: [NatsModule],
  controllers: [ExtensionsController],
})
export class ExtensionsModule {}
