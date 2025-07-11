import { Module } from '@nestjs/common';
import { NatsModule } from '../../transports/nats.module';
import { PermissionController } from './permission.controller';

@Module({
  imports: [NatsModule],
  controllers: [PermissionController],
})
export class PermissionModule {}
