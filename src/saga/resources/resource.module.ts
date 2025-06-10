import { Module } from '@nestjs/common';
import { ResourceController} from './resource.controller';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  imports: [NatsModule],
  controllers: [ResourceController],
})
export class ResourceModule {}
