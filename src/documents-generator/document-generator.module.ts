import { Module } from "@nestjs/common";
import { NatsModule } from "../transports/nats.module";

import { DocumentGeneratorController } from "./document-generator.controller";

@Module({
  imports: [NatsModule],
  controllers: [DocumentGeneratorController],
})
export class DocumentGeneratorModule {}