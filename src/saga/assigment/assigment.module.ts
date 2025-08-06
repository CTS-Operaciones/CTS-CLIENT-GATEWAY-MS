import { Module } from '@nestjs/common';
import { NatsModule } from 'src/transports/nats.module';
import {
  AssigmentController,
  inventoryHasAssignRemoveController,
} from './assigment.controller';

@Module({
  imports: [NatsModule],
  controllers: [AssigmentController, inventoryHasAssignRemoveController],
})
export class AssigmentModule {}
