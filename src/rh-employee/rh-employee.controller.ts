import { Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { NATS_SERVICE } from '../common';

@Controller()
export class RhEmployeeController {
  constructor(@Inject(NATS_SERVICE) private readonly clientRH: ClientProxy) {}

  @Post()
  async create() {}
}
