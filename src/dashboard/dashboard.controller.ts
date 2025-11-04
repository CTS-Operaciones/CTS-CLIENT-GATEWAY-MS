import { Controller, Get, Inject, Query } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { ApiTags } from "@nestjs/swagger";

import { NATS_SERVICE, sendAndHandleRpcExceptionPromise } from "../common";
import { FilterDashboardDto } from "./dto";

@ApiTags('Dashboard 📊')
@Controller({ path: 'dashboard', version: '1' })
export class DashboardController {
  constructor(
    @Inject(NATS_SERVICE) private readonly dashboardService: ClientProxy,
  ) {}

  @Get('rh')
  async getDashboardData(@Query() filterDashboardDto: FilterDashboardDto) {
    return sendAndHandleRpcExceptionPromise(
      this.dashboardService,
      'get-dashboard-data',
      filterDashboardDto,
    );
  }
}