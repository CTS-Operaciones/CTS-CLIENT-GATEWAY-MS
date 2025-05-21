import { Controller, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { NATS_SERVICE } from '../common/config';

@Controller()
export class RhEmployeeController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}
}
