import { Module } from '@nestjs/common';
import { NatsModule } from 'src/transports/nats.module';
import { AssigmentController } from './assigment.controller';

@Module({
  imports: [NatsModule],
  controllers: [AssigmentController],
  
})
export class AssigmentModule {}
