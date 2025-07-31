import { Module } from '@nestjs/common';

import { BankController } from './rh-bank.controller';
import { NatsModule } from '../../transports/nats.module';

@Module({
  imports: [NatsModule],
  controllers: [BankController],
})
export class RhBanksModule {}
