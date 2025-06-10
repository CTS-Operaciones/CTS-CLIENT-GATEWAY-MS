import { Module } from '@nestjs/common';

import { HeadquartersController } from './headquarters.controller';
import { NatsModule } from '../../transports/nats.module';

@Module({
  imports: [NatsModule],
  controllers: [HeadquartersController],
})
export class HeadquartersModule {}
