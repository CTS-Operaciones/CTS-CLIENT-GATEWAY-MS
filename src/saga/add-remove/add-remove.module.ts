import { Module } from '@nestjs/common';
import { NatsModule } from 'src/transports/nats.module';
import { AddRemoveController } from './add-remove.controller';  
@Module({
  imports: [NatsModule],
  controllers: [AddRemoveController],
  
})
export class AddRemoveModule {}
