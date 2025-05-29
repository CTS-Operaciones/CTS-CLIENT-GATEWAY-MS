import { Module } from '@nestjs/common';

import { NatsModule } from '../../transports/nats.module';
import { RoleController } from './role.controller';

@Module({
  imports: [NatsModule],
  controllers: [RoleController],
})
export class RoleModule {}
