import { Module } from '@nestjs/common';

import { NatsModule } from '../../transports/nats.module';
import { ContractController } from './contract.controller';

@Module({
  imports: [NatsModule],
  controllers: [ContractController],
})
export class ContractModule {}
