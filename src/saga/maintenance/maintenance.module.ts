import { Module } from '@nestjs/common';
import { NatsModule } from 'src/transports/nats.module';
import {
  MaintenanceController,
  inventoryHasMaintenanceController
} from './maintenance.controller';
@Module({
  imports: [NatsModule],
  controllers: [MaintenanceController, inventoryHasMaintenanceController],
})
export class MaintenanceModule {}
