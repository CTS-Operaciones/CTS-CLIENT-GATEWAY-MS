import { Module } from '@nestjs/common';
import { NatsModule } from '../../transports/nats.module';

import { RhDocumentController } from './rh-document.controller';
import { RhTypeDocumentController } from './typeDocument.controller';

@Module({
  imports: [NatsModule],
  controllers: [RhDocumentController, RhTypeDocumentController],
})
export class RhDocumentModule {}
