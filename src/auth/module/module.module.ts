import { Module } from '@nestjs/common';
import { NatsModule } from '../../transports/nats.module';
import { ModuleController } from './module.controller';

@Module({
  imports: [NatsModule],
  controllers: [ModuleController],
})
export class ModuleModule {}
